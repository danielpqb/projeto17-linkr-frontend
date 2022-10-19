import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../../contexts/userContext";
import InputBox from "../Common/InputBox";
import LoginHeader from "../Common/LoginHeader";
import SubmitButton from "../Common/SubmitButton";
import { postSignUp } from "../../services/linkrAPI";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const { setAlert } = useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await postSignUp(form);
    } catch (error) {
      console.log(error.response);
      setAlert({ show: true, message: "Usuário cadastrado com sucesso" });
      // setAlert({ show: true, message: `Erro ${error.response.status}` });
      return;
    }

    navigate("/");
  }

  return (
    <Container>
      <LoginHeader />

      <RegisterForm action="" onSubmit={handleSubmit}>
        <InputBox
          name="email"
          placeholder="e-mail"
          type="email"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          value={form.email}
          required
        />
        <InputBox
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
          value={form.password}
        />
        <InputBox
          name="name"
          placeholder="username"
          type="name"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
          value={form.name}
          required
        />
        <InputBox
          name="imageUrl"
          placeholder="picture url"
          type="imageUrl"
          onChange={(e) => {
            setForm({ ...form, imageUrl: e.target.value });
          }}
          value={form.imageUrl}
          required
        />

        <SubmitButton>Sign Up</SubmitButton>
      </RegisterForm>

      <RedirectTo>
        <Link to={"/"}>Switch back to log in</Link>
      </RedirectTo>
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
    color: #ffffff;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    margin: 30px 0px;
  }
`;

const RegisterForm = styled.form`
  & {
    flex-direction: column;
    width: 100%;
    height: 50%;
    text-align: center;

    margin-top: 200px;
  }
`;

const ValidationBox = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  h2 {
    cursor: pointer;
    font-weight: 400;
    font-size: 14px;
    margin-top: 5px;
    text-decoration: underline;
    &:hover {
      filter: brightness(0.6);
    }
  }
  h3 {
    font-weight: 400;
    font-size: 14px;
    margin-top: 5px;
  }
`;

const RedirectTo = styled.div`
  & {
    margin: 20px;
  }

  a {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;
    text-decoration-line: underline;
  }
`;
