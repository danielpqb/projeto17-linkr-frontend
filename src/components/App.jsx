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
import ProtectedRoute from "./Common/ProtectedRoute";
import createMessage from "./functions/createMessage";
import promiseRetry from "promise-retry";

export default function App() {
  const [userData, setUserData] = useState({});
  const [alert, setAlert] = useState({});
  const [reloadApp, setReloadApp] = useState(false);
  const [arrPosts, setArrPosts] = useState([]);
  const [arrTrendingHashtags, setArrTrendingHashtags] = useState(["There are no hashtags yet"]);
  const [refreshFeed, setRefreshFeed] = useState(false);
  const [targetUser, setTargetUser] = useState({ id: -1, name: ""});

  useEffect(() => {
    const localToken = localStorage.getItem("userToken");

    if (localToken) {
      promiseRetry(
        //Function that will retry
        (retry, number) => {
          return getUserDataByToken(localToken).catch(retry);
        },
        { retries: 4, minTimeout: 1000, factor: 2 }
      ).then(
        //Resolved at any try
        (res) => {
          delete res.data.message;
          setUserData(res.data);
        },
        //Couldn't resolve after all tries
        (err) => {
          const message = createMessage(err);

          setAlert({
            show: true,
            message: message,
            type: 0,
            doThis: () => {},
            color: "rgba(200,0,0)",
            icon: "alert-circle",
          });
        }
      );
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
            targetUser, 
            setTargetUser
          }}
        >
          <PostsContext.Provider
            value={{
              arrPosts,
              setArrPosts,
              arrTrendingHashtags,
              setArrTrendingHashtags,
              refreshFeed,
              setRefreshFeed,
            }}
          >
            <Container>
              {alert.show && <Alert />}
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route element={<ProtectedRoute token={localStorage.getItem("userToken")} setAlert={setAlert} />}>
                    <Route path="/timeline" element={<Feed type={"timeline"} />} />
                    <Route path="/hashtag/:hashtag" element={<Feed type={"hashtag"} />} />
                    <Route path="/user/:id" element={<Feed type={"user"} />} />
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
