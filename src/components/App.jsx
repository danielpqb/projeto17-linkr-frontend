import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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

export default function App() {
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState({});
  const [reloadApp, setReloadApp] = useState(false);
  const [arrPosts, setArrPosts] = useState([]);
  const [arrTrendingHashtags, setArrTrendingHashtags] = useState(['There are no hashtags yet']);
  const [refreshFeed, setRefreshFeed] = useState(false);

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
          <PostsContext.Provider 
            value={{ 
              arrPosts,
              setArrPosts,
              arrTrendingHashtags,
              setArrTrendingHashtags, 
              refreshFeed, 
              setRefreshFeed 
            }}
          >
            <Container>
              {alert.show && <Alert />}
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<SignIn />}></Route>
                  <Route path="/sign-up" element={<SignUp />}></Route>
                  <Route
                    path="/timeline"
                    element={<Feed type={"timeline"} />}
                  ></Route>
                  <Route
                    path="/hashtag/:hashtag"
                    element={<Feed type={"hashtag"} />}
                  ></Route>
                  <Route
                    path="/users/:id"
                    element={<Feed type={"user"} />}
                  ></Route>
                  <Route path="*" element={<Navigate to="/" />}></Route>
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
