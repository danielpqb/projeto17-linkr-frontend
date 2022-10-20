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

              <Route path="/" element={<Feed type={'timeline'}/>}></Route>
              <Route path="/hashtag/:hashtag" element={<Feed type={'hashtag'}/>}></Route>
              <Route path="/user/:id" element={<Feed type={'profile'}/>}></Route>
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