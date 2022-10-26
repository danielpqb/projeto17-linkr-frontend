import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import { Container, Content, Loading, RefreshIcon, RefreshNewPosts, Trending, TrendingHashtags, TrendingLine, TrendingTitle } from "./style";
import { getHashtagPosts, getTimelinePosts, getTrendingHashtags, getUserPosts } from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import UserContext from "../../contexts/userContext";
import PostsContext from "../../contexts/postsContext";
import { useNavigate, useParams } from "react-router-dom";
import useInterval from 'use-interval';
import { MdCached } from 'react-icons/md';

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
  const [idLastPost, setIdLastPost] = useState(0);
  const [newPostsNumber, setNewPostsNumber] = useState(0);
  const [haveNewPosts, setHaveNewPosts] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (type === "timeline") {
      setNewPostsNumber(0);
      setHaveNewPosts(false);
      setIsTimeline(true);
      setTitle("timeline");
      getTimelinePosts()
        .then((answer) => {
          setArrPosts(answer.data[0]);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          }else{
            setIdLastPost(answer.data[0][0].id);
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
  }, [
    refreshFeed,
    thisUserId,
    setAlert,
    hashtag,
    setArrPosts,
    setUserData,
    setIsLoading,
    type,
    userData.id,
  ]);

  useEffect(() => {
    getTrendingHashtags()
    .then((answer) => {
      setArrTrendingHashtags(answer.data[0]);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [
    setArrTrendingHashtags,
    updateTrending
  ]);

  function goHashtag(hashtag) {
    if (isLoading === false) {
      navigate(`/hashtag/${hashtag}`);
      setRefreshFeed(!refreshFeed);
    }
  }

  
  useInterval(() => {
    if(idLastPost > 0){
      getTimelinePosts()
        .then((answer) => {
          const arrPostsUpdate = answer.data[0];
          for(let i=0; i<arrPostsUpdate.length; i++){
            if(arrPostsUpdate[i].id > idLastPost){
              setIdLastPost(arrPostsUpdate[i].id);
              setNewPostsNumber(newPostsNumber+1);
            }
          }
          if(newPostsNumber > 0){
            setHaveNewPosts(true);
          }
        })
        .catch((error) => {
          console.log(error)
        });
  }
  }, 15000);
  
  function refreshNewPosts() {
    if (isLoading === false) {
      setArrPosts([]);
      setRefreshFeed(!refreshFeed);
    }
  }

  

  return (
    <>
      <TopBar />
      <Content>
        <Container>
          <h1>{title}</h1>
          {isTimeline ? <Publish /> : <></>}
          {haveNewPosts ? (
            <RefreshNewPosts onClick={refreshNewPosts}>
              {newPostsNumber} new posts, load more! <RefreshIcon><MdCached/></RefreshIcon> 
            </RefreshNewPosts>
          ) : (
            <></>
          )}
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
