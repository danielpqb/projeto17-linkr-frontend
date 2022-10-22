import React, { useEffect } from "react";
import { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import styled from "styled-components";

import GlobalStyle from "../styles/GlobalStyles";
import UserContext from "../contexts/userContext";
import AppContext from "../contexts/AppContext";
import PostsContext from "../contexts/postsContext";
import Feed from "./Feed";

import Alert from "./Common/Alert";
import SignUp from "./Screens/SignUp";
import SignIn from "./Screens/SignIn";

import { getUserDataByToken } from "../services/linkrAPI";
import ProtectedRoute from "./Common/ProtectedRoute";

export default function App() {
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState({});
  const [reloadApp, setReloadApp] = useState(false);
  const [arrPosts, setArrPosts] = useState([]);

  useEffect(() => {
    const localToken = localStorage.getItem("userToken");

    if (localToken) {
      getUserDataByToken(localToken).then((res) => {
        delete res.data.message;
        setUserData(res.data);
      });
    }
  }, [setUserData, reloadApp]);

  return (
    <>
      <GlobalStyle />
      <AppContext.Provider value={{ reloadApp, setReloadApp }}>
        <UserContext.Provider
          value={{
            userData,
            setUserData,
            alert,
            setAlert,
          }}
        >
          <PostsContext.Provider value={{ arrPosts, setArrPosts }}>
            <Container>
              {alert.show && <Alert />}
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route
                    element={
                      <ProtectedRoute
                        token={localStorage.getItem("userToken")}
                        setAlert={setAlert}
                      />
                    }
                  >
                    <Route
                      path="/timeline"
                      element={<Feed type={"timeline"} />}
                    />
                    <Route
                      path="/hashtag/:hashtag"
                      element={<Feed type={"hashtag"} />}
                    />
                    <Route path="/users/:id" element={<Feed type={"user"} />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </Container>
          </PostsContext.Provider>
        </UserContext.Provider>
      </AppContext.Provider>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
