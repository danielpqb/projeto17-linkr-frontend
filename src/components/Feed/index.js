import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import {
  HeaderRepost,
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
  getAllReposts,
  getHashtagPosts,
  getTimelinePosts,
  getTrendingHashtags,
  getUserById,
  getUserFollows,
  getUserPosts,
} from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import { FaRetweet } from "react-icons/fa";
import PostsContext from "../../contexts/postsContext";
import { useNavigate, useParams } from "react-router-dom";
import FollowButton from "../FollowButton";
import useInterval from "use-interval";
import { MdCached } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import promiseRetry from "promise-retry";

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
  const [isRepost, setIsRepost] = useState(false);
  const [repostArr, setRepostArr] = useState([]); // array que contem os reposts
  const [followSomeone, setFollowSomeone] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsEmpty(false);
    setIsError(false);
    setDisplayedPosts([]);
    setFollowSomeone(true);

    getAllReposts()
    .then((response) => {
      setRepostArr(response.data.filter((repost) => repost.reposterId));
      //setIsRepost(true); // tá colocando o header de repost em todos os posts
    })
    .catch((error) => console.log(error));

    if (type === "timeline") {
      setNewPostsNumber(0);
      setHaveNewPosts(false);
      setIsTimeline(true);
      setTitle("timeline");
      getUserFollows().then((answer) => {
        if (answer.data === true) {
          promiseRetry(
            //Function that will retry
            (retry, number) => {
              return getTimelinePosts().catch(retry);
            },
            { retries: 2, minTimeout: 1000, factor: 2 }
          ).then(
            //Resolved at any try
            (answer) => {
              setArrPosts(answer.data[0]);
              setDisplayedPosts(answer.data[0].slice(infiniteScrollIndex, infiniteScrollIndex + 10));
              if (answer.data[0].length < 10) {
                setHasMore(false);
              }
              setInfiniteScrollIndex(infiniteScrollIndex + 10);
              if (answer.data[0].length === 0) {
                setIsEmpty(true);
              } else {
                setIdLastPost(answer.data[0][0].id);
              }
            },
            //Couldn't resolve after all tries
            () => {
              setIsError(true);
            }
          );
        } else {
          setFollowSomeone(false);
        }
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
          if (answer.data[0].length === 0) {
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
          if (answer.data[0].length === 0) {
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
    setIsLoading,
    type,
    navigate,
    userPageId,
    setInfiniteScrollIndex,
    setArrPosts,
    setRepostArr
  ]);

  useEffect(() => {
    getTrendingHashtags()
      .then((answer) => {
        setArrTrendingHashtags(answer.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setArrTrendingHashtags, updateTrending]);

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

  console.log(repostArr);
  console.log(arrPosts);

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
              <RefreshNewPosts
                onClick={() => {
                  setInfiniteScrollIndex(0);
                  refreshNewPosts();
                }}
              >
                {newPostsNumber} new posts, load more!{" "}
                <RefreshIcon>
                  <MdCached />
                </RefreshIcon>
              </RefreshNewPosts>
            ) : (
              <></>
            )}
            {followSomeone ? (
              <>
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
                                <>
                                  {isRepost ? (
                                    <>
                                      <HeaderRepost>
                                        <FaRetweet />
                                        <p>Re-posted by FULANO</p>
                                      </HeaderRepost>
                                    </>
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
                            </InfiniteScroll>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <Loading>You don't follow anyone yet. Search for new friends!</Loading>
            )}
          </Container>
          <Trending>
            <TrendingTitle>trending</TrendingTitle>
            <TrendingLine></TrendingLine>
            {arrTrendingHashtags.map((hashtagMap, index) => (
              <TrendingHashtags
                key={index}
                onClick={() => {
                  if (isLoading === false) {
                    setInfiniteScrollIndex(0);
                    navigate(`/hashtag/${hashtagMap}`);
                    setRefreshFeed(!refreshFeed);
                    refreshNewPosts();
                  }
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
