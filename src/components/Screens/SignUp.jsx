import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import InputBox from "../Common/InputBox";
import LoginHeader from "../Common/LoginHeader";
import SubmitButton from "../Common/SubmitButton";
import { postSignUp } from "../../services/linkrAPI";
import UserContext from "../../contexts/userContext";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const { alert, setAlert } = useContext(UserContext);

  const navigate = useNavigate();

  function createMessage(error) {
    const code = error.response.status;
    const body = error.response.data.message;

    let message = `Error ${code}\n\n
    ${body}`;

    //If Joi patterns not safitisfied
    if (code === 422) {
      const { name, email, password, imageUrl } = form;

      //Validate fields
    }

    return message;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitDisabled) {
      return;
    }
    setIsSubmitDisabled(true);

    try {
      await postSignUp(form);
      setAlert({
        ...alert,
        show: true,
        message: "Usuário criado com sucesso!",
        type: 0,
        doThis: () => {},
        color: undefined,
        icon: undefined,
      });
      setIsSubmitDisabled(false);
    } catch (error) {
      console.log(error);

      const message = createMessage(error);

      setAlert({
        ...alert,
        show: true,
        message: message,
        type: 0,
        doThis: () => {},
        color: "rgba(200,0,0)",
        icon: "alert-circle",
      });
      setIsSubmitDisabled(false);
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

        <SubmitButton disabled={isSubmitDisabled}>Sign Up</SubmitButton>
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
