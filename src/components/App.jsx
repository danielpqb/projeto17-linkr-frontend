import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "../GlobalStyles";
import UserContext from "../Context/UserContext";

import { useEffect, useState } from "react";
import { getUserByToken } from "../services/linkrAPI";

export default function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const localToken = localStorage.getItem("userToken");

    if (localToken) {
      getUserByToken(localToken).then((res) => {
        setUserData(res.data);
      });
    }
  }, [setUserData]);

  return (
    <Container>
      <BrowserRouter>
        <UserContext.Provider
          value={{
            userData,
            setUserData,
          }}
        >
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<></>}></Route>
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
  & {
    background-color: var(--azul-base);
    flex-direction: column;
  }
`;
