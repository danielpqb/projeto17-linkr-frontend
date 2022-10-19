import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../../contexts/userContext";
import InputBox from "../Common/InputBox";
import LoginHeader from "../Common/LoginHeader";
import SubmitButton from "../Common/SubmitButton";
import { postSignIn } from "../../services/superwallAPI";

export default function SignIn() {
  const { userData, setUserData } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitDisabled(true);

    postSignIn(form)
      .then((res) => {
        setUserData({
          ...userData,
          ...res.data,
        });
        localStorage.setItem("userToken", res.data.token);
        navigate("/");
      })
      .catch((res) => {
        setIsSubmitDisabled(false);
        alert(`Erro ${res.response.status}: ${res.response.data.message}`);
        throw res;
      });
  }

  return (
    <Container>
      <LoginHeader />

      <RegisterForm action="" onSubmit={handleSubmit}>
        <InputBox
          name="email"
          placeholder="Email"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          value={form.email}
        />
        <InputBox
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
          value={form.password}
        />

        {showPassword ? (
          <h2 onClick={() => setShowPassword(false)}>Ocultar senha</h2>
        ) : (
          <h2 onClick={() => setShowPassword(true)}>Exibir senha</h2>
        )}

        <SubmitButton disabled={isSubmitDisabled}>Entrar</SubmitButton>
      </RegisterForm>

      <Link to={"/account/register"}>Primeira vez? Cadastre-se!</Link>
    </Container>
  );
}

const Container = styled.div`
  & {
    width: calc(100vw - (100vw - 100%));
    min-height: 100vh;
    flex-direction: column;
    padding: 20px;
    font-weight: 700;
    font-size: 15px;
  }
`;

const RegisterForm = styled.form`
  & {
    flex-direction: column;
    width: 100%;
    height: 50%;
    text-align: center;
  }
  h2 {
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    margin: 10px;
    text-decoration: underline;
    &:hover {
      filter: brightness(0.6);
    }
  }
`;
