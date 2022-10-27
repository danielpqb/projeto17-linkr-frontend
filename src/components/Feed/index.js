import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import {
  Container,
  Content,
  HeaderRepost,
  Loading,
  Trending,
  TrendingHashtags,
  TrendingLine,
  TrendingTitle,
} from "./style";
import { getHashtagPosts, getTimelinePosts, getTrendingHashtags, getUserPosts } from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import { FaRetweet } from "react-icons/fa";
import UserContext from "../../contexts/userContext";
import PostsContext from "../../contexts/postsContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Feed({ type }) {
  const navigate = useNavigate();
  const { hashtag } = useParams();
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const [isTimeline, setIsTimeline] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [updateTrending, setUpdateTrending] = useState(false);
  const { arrPosts, setArrPosts } = React.useContext(PostsContext);
  const { arrTrendingHashtags, setArrTrendingHashtags } = React.useContext(PostsContext);
  const { userData, setUserData, setAlert } = React.useContext(UserContext);
  const { refreshFeed, setRefreshFeed } = React.useContext(PostsContext);
  const { isLoading, setIsLoading } = React.useContext(PostsContext);
  const [thisUserId, setThisUserId] = useState(-1);
  const [isRepost, setIsRepost] = useState(false);
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    setIsLoading(true);

    if (type === "timeline") {
      setIsTimeline(true);
      setTitle("timeline");
      getTimelinePosts()
        .then((answer) => {
          setArrPosts(answer.data[0]);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          }
        })
        .catch((error) => {
          setIsError(true);
        });
    }
    if (type === "hashtag") {
      setIsTimeline(false);
      setTitle(`# ${hashtag}`);
      getHashtagPosts(hashtag)
        .then((answer) => {
          setArrPosts(answer.data[0]);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          }
        })
        .catch(() => {
          setIsError(true);
          if (thisUserId === -1) {
            setThisUserId(userData.id);
          }
        });
    }
    if (type === "user") {
      setIsTimeline(false);
      const localTargetUser = JSON.parse(localStorage.getItem("targetUser"));
      setTitle(`${localTargetUser.name}'s page`);
      getUserPosts(localTargetUser.id)
        .then((answer) => {
          setArrPosts(answer.data[0]);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          }
        })
        .catch(() => {
          setIsError(true);
        });
    }

    setIsLoading(false);
  }, [refreshFeed, thisUserId, setAlert, hashtag, setArrPosts, setUserData, setIsLoading, type, userData.id]);

  useEffect(() => {
    repost(2); // aplicando em todos os posts. como pegar pegar o postId aqui?
    getTrendingHashtags()
      .then((answer) => {
        setArrTrendingHashtags(answer.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setArrTrendingHashtags, updateTrending, isRepost]);

  function goHashtag(hashtag) {
    if (isLoading === false) {
      navigate(`/hashtag/${hashtag}`);
      setRefreshFeed(!refreshFeed);
    }
  }

  function repost(postId) {
    const promise = axios.get(`${BASE_URL}/repost/${postId}`);
    promise
      .then((response) => {
        if (response.data !== 0) {
          setIsRepost(true);
        }
        console.log(isRepost);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <TopBar />
      <Content>
        <Container>
          <h1>{title}</h1>
          {isTimeline ? <Publish /> : <></>}
          {isLoading ? (
            <Loading>Loading...</Loading>
          ) : (
            <>
              {isError ? (
                <Loading>An error occured while trying to fetch the posts, please refresh the page</Loading>
              ) : (
                <>
                  {isEmpty ? (
                    <Loading>There are no posts yet</Loading>
                  ) : (
                    <>
                      {arrPosts.map((post, index) => (
                        <>
                          {isRepost ? (
                            <HeaderRepost>
                              <FaRetweet />
                              <p>Re-posted by FULANO</p>
                            </HeaderRepost>
                          ) : (
                            <></>
                          )}

                          <Post
                            key={index}
                            userId={post.user.id}
                            userImage={post.user.image}
                            userName={post.user.name}
                            postText={post.text}
                            metadata={post.metadata}
                            postLink={post.metadata.link}
                            postId={post.id}
                            updateTrending={updateTrending}
                            setUpdateTrending={setUpdateTrending}
                          />
                        </>
                      ))}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </Container>
        <Trending>
          <TrendingTitle>trending</TrendingTitle>
          <TrendingLine></TrendingLine>
          {arrTrendingHashtags.map((hashtagMap, index) => (
            <TrendingHashtags key={index} onClick={() => goHashtag(hashtagMap)}>
              # {hashtagMap}
            </TrendingHashtags>
          ))}
        </Trending>
      </Content>
    </>
  );
}
