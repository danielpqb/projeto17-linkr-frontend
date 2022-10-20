import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "../styles/GlobalStyles";
import UserContext from "../contexts/userContext";

import Feed from "./Feed";

import Alert from "./Common/Alert";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";

export default function App() {
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState({});

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{
          userData,
          setUserData,
          alert,
          setAlert,
        }}
      >
        <Container>
          {alert.show && <Alert />}
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<SignIn />}></Route>
              <Route path="/sign-up" element={<SignUp />}></Route>
              <Route path="/feed" element={<Feed type={'timeline'}/>}></Route>
              <Route path="/hashtag/:hashtag" element={<Feed type={'hashtag'}/>}></Route>
              <Route path="/users/:id" element={<Feed type={'user'} />}></Route>
              <Route path="*" element={<Navigate to="/" />}></Route>
              
            </Routes>
          </BrowserRouter>
        </Container>
      </UserContext.Provider>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
