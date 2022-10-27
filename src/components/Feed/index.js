import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import {
  Container,
  Content,
  Loading,
  RefreshIcon,
  RefreshNewPosts,
  Trending,
  TrendingHashtags,
  TrendingLine,
  TrendingTitle,
  Header,
} from "./style";
import {
  getHashtagPosts,
  getTimelinePosts,
  getTrendingHashtags,
  getUserById,
  getUserPosts,
} from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import PostsContext from "../../contexts/postsContext";
import { useNavigate, useParams } from "react-router-dom";
import FollowButton from "../FollowButton";
import useInterval from "use-interval";
import { MdCached } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Feed({ type }) {
  const navigate = useNavigate();
  const {
    arrPosts,
    setArrPosts,
    refreshFeed,
    setRefreshFeed,
    isLoading,
    setIsLoading,
    infiniteScrollIndex,
    setInfiniteScrollIndex,
    arrTrendingHashtags,
    setArrTrendingHashtags,
  } = React.useContext(PostsContext);
  const { hashtag, userPageId } = useParams();
  const [title, setTitle] = useState("");
  const [isError, setIsError] = useState(false);
  const [isTimeline, setIsTimeline] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [updateTrending, setUpdateTrending] = useState(false);
  const [userPageData, setUserPageData] = useState({ id: "", imageUrl: "", name: "", hasInfo: false });
  const [idLastPost, setIdLastPost] = useState(0);
  const [newPostsNumber, setNewPostsNumber] = useState(0);
  const [haveNewPosts, setHaveNewPosts] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedPosts, setDisplayedPosts] = useState([]);

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
          setDisplayedPosts(answer.data[0].slice(infiniteScrollIndex, infiniteScrollIndex + 10));

          if (answer.data[0].length < 10) {
            setHasMore(false);
          }
          setInfiniteScrollIndex(infiniteScrollIndex + 10);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          } else {
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
          setDisplayedPosts(answer.data[0].slice(infiniteScrollIndex, infiniteScrollIndex + 10));
          if (answer.data[0].length < 10) {
            setHasMore(false);
          }
          setInfiniteScrollIndex(infiniteScrollIndex + 10);
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
          setUserPageData({ ...answer.data, hasInfo: true });
          setTitle(`${answer.data.name}'s page`);
        })
        .catch((error) => {
          setIsError(true);
        });
      getUserPosts(userPageId)
        .then((answer) => {
          setArrPosts(answer.data[0]);
          setDisplayedPosts(answer.data[0].slice(infiniteScrollIndex, infiniteScrollIndex + 10));
          if (answer.data[0].length < 10) {
            setHasMore(false);
          }
          setInfiniteScrollIndex(infiniteScrollIndex + 10);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          }
        })
        .catch(() => {
          setIsError(true);
        });
    }

    setIsLoading(false);
  }, [refreshFeed, hashtag, setIsLoading, type, navigate, userPageId]);

  useEffect(() => {
    getTrendingHashtags()
      .then((answer) => {
        setArrTrendingHashtags(answer.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setArrTrendingHashtags, updateTrending]);

  function goHashtag(hashtag) {
    if (isLoading === false) {
      navigate(`/hashtag/${hashtag}`);
      setRefreshFeed(!refreshFeed);
    }
  }

  useInterval(() => {
    if (idLastPost > 0) {
      getTimelinePosts()
        .then((answer) => {
          const arrPostsUpdate = answer.data[0];
          for (let i = 0; i < arrPostsUpdate.length; i++) {
            if (arrPostsUpdate[i].id > idLastPost) {
              setIdLastPost(arrPostsUpdate[i].id);
              setNewPostsNumber(newPostsNumber + 1);
            }
          }
          if (newPostsNumber > 0) {
            setHaveNewPosts(true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, 15000);

  function refreshNewPosts() {
    if (isLoading === false) {
      setArrPosts([]);
      setRefreshFeed(!refreshFeed);
    }
  }

  const fetchData = () => {
    const newPosts = arrPosts.slice(infiniteScrollIndex, infiniteScrollIndex + 10);
    setInfiniteScrollIndex(infiniteScrollIndex + 10);
    setDisplayedPosts([...displayedPosts, ...newPosts]);

    if (newPosts.length < 10) {
      setHasMore(false);
    }
  };

  return (
    <>
      <TopBar />
      <Content>
        <Header>
          <div>
            {type === "user" ? (
              <img
                src={userPageData.imageUrl}
                alt="user"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg";
                }}
              />
            ) : (
              <></>
            )}
            <h1>{title}</h1>
          </div>
          {type === "user" ? <FollowButton userPageData={userPageData} setIsError={setIsError} /> : <></>}
        </Header>
        <div>
          <Container>
            {isTimeline ? <Publish /> : <></>}
            {haveNewPosts ? (
              <RefreshNewPosts onClick={refreshNewPosts}>
                {newPostsNumber} new posts, load more!{" "}
                <RefreshIcon>
                  <MdCached />
                </RefreshIcon>
              </RefreshNewPosts>
            ) : (
              <></>
            )}
            {isLoading ? (
              <Loading>Loading...</Loading>
            ) : (
              <>
                {isError ? (
                  <Loading>
                    <p>
                      An error occured while trying to fetch the posts, <br />
                      please refresh the page or go back to timeline
                    </p>
                  </Loading>
                ) : (
                  <>
                    {isEmpty ? (
                      <Loading>No posts found from your friends</Loading>
                    ) : (
                      <>
                        <InfiniteScroll
                          dataLength={displayedPosts.length}
                          next={fetchData}
                          hasMore={hasMore}
                          loader={<Loading>Loading...</Loading>}
                          endMessage={<Loading>You have seen it all!</Loading>}
                        >
                          {displayedPosts.map((post, index) => (
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
                        </InfiniteScroll>
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
              <TrendingHashtags
                key={index}
                onClick={() => {
                  setInfiniteScrollIndex(0);
                  goHashtag(hashtagMap);
                }}
              >
                # {hashtagMap}
              </TrendingHashtags>
            ))}
          </Trending>
        </div>
      </Content>
    </>
  );
}
