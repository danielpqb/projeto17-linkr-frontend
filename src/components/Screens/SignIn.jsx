import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../../contexts/userContext";
import InputBox from "../Common/InputBox";
import LoginHeader from "../Common/LoginHeader";
import SubmitButton from "../Common/SubmitButton";
import { postSignIn } from "../../services/linkrAPI";
import AppContext from "../../contexts/AppContext";
import createMessage from "../functions/createMessage";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const { reloadApp, setReloadApp } = useContext(AppContext);
  const { setAlert } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitDisabled) {
      return;
    }
    setIsSubmitDisabled(true);

    const promise = postSignIn(form);
    promise
      .then((res) => {
        localStorage.setItem("userToken", res.data.token);

        setAlert({
          show: true,
          message: "You have loged in!",
          type: 0,
          doThis: () => {},
          color: undefined,
          icon: undefined,
        });

        setIsSubmitDisabled(false);

        navigate("/timeline");

        setTimeout(() => {
          setReloadApp(!reloadApp);
        }, 200);
      })
      .catch((error) => {
        const message = createMessage(error);

        setAlert({
          show: true,
          message: message,
          type: 0,
          doThis: () => {},
          color: "rgba(200,0,0)",
          icon: "alert-circle",
        });
        setIsSubmitDisabled(false);
        return;
      });
  }

  return (
    <Container>
      <LoginHeader />

      <RegisterForm action="" onSubmit={handleSubmit}>
        <InputBox
          name="email"
          placeholder="e-mail"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
          value={form.email}
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

        <SubmitButton disabled={isSubmitDisabled}>Log In</SubmitButton>
      </RegisterForm>

      <RedirectTo>
        <Link to={"/sign-up"}>First time? Create an account!</Link>
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

  @media (min-width: 800px) {
    & {
      display: flex;
      justify-content: center;
      align-items: center;
    }
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

  @media (min-width: 800px) {
    & {
      width: calc(40% - 20px);
      text-align: center;

      margin-top: 0px;
      margin-left: calc(60% + 22px);
    }
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

  @media (min-width: 800px) {
    & {
      margin-left: calc(60% + 22px);
    }
  }
`;
