import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import { Container, Content, Loading, Trending, TrendingHashtags, TrendingLine, TrendingTitle, Header } from "./style";
import { getHashtagPosts, getTimelinePosts, getTrendingHashtags, getUserById, getUserPosts } from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import PostsContext from "../../contexts/postsContext";
import { useNavigate, useParams } from "react-router-dom";
import FollowButton from "../FollowButton";

export default function Feed({ type }) {
  const navigate = useNavigate();
  const { hashtag, userPageId } = useParams();
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const [isTimeline, setIsTimeline] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [updateTrending, setUpdateTrending] = useState(false);
  const [userPageData, setUserPageData] = useState({id:"", imageUrl:"", name:"", hasInfo:false})
  const { arrPosts, setArrPosts } = React.useContext(PostsContext);
  const { arrTrendingHashtags, setArrTrendingHashtags } = React.useContext(PostsContext);
  const { refreshFeed, setRefreshFeed } = React.useContext(PostsContext);
  const { isLoading, setIsLoading } = React.useContext(PostsContext);

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
        });
    }
    if (type === "user") {
      setIsTimeline(false);
      getUserById(userPageId)
        .then((answer) => {
          setUserPageData({...answer.data, hasInfo:true});
          setTitle(`${answer.data.name}'s page`);
        })
        .catch((error) => {
          setIsError(true);
        });
      getUserPosts(userPageId)
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
    hashtag,
    setArrPosts,
    setIsLoading,
    type,
    navigate,
    userPageId
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

  return (
    <>
      <TopBar />
      <Content>
        <Header>
          <div>
            {type === "user"?
              <img
                src={userPageData.imageUrl}
                alt="user"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; 
                  currentTarget.src="https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg";
                }} />
              :
              <></>}
            <h1>{title}</h1>
          </div>
          {type === "user"? <FollowButton userPageData={userPageData}/> : <></>}
        </Header>
        <div>
          <Container>
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
        </div>
      </Content>
    </>
  );
}
