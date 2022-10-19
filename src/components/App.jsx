import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "../styles/GlobalStyles";
import UserContext from "../contexts/userContext";

import Feed from "./Feed";

export default function App() {
  const [userData, setUserData] = useState({});

  return (
    <>
      <GlobalStyle />

      <UserContext.Provider value={{
            userData,
            setUserData,
      }}>

        <Container>
          <BrowserRouter>
            <Routes>

              <Route path="/" element={<Feed title={'timeline'}/>}></Route>
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