import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import { Container, Loading } from "./style";
import { getTimelinePosts } from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import PostsContext from "../../contexts/postsContext";

export default function Feed({ type }) {
  const [title, setTitle] = useState("");
  const [isTimeline, setIsTimeline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { arrPosts, setArrPosts } = React.useContext(PostsContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (type === "timeline") {
      setIsTimeline(true);
      setTitle("timeline");
      getTimelinePosts(1)
        .then((answer) => {
          setArrPosts(answer.data);
          setIsLoading(false);
          if (answer.data.length === 0) {
            setIsEmpty(true);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setIsError(true);
        });
    }
    if (type === "hashtag") {
    }
    if (type === "user") {
    }
  }, []);

  return (
    <>
      <TopBar />
      <Container>
        <h1>{title}</h1>
        {isTimeline ? <Publish /> : <></>}
        {isLoading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            {isError ? (
              <Loading>
                An error occured while trying to fetch the posts, please refresh
                the page
              </Loading>
            ) : (
              <>
                {isEmpty ? (
                  <Loading>There are no posts yet</Loading>
                ) : (
                  <>
                    {arrPosts.map((post, index) => (
                      <Post
                        key={index}
                        userImage={post.user.image}
                        userName={post.user.name}
                        postText={post.text}
                        metadata={post.metadata}
                        postLink={post.link}
                        postId={post.id}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
