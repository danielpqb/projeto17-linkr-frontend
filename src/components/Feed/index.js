import React from "react";
import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import { Container, Content, Loading, Trending, TrendingHashtags, TrendingLine, TrendingTitle } from "./style";
import { getHashtagPosts, getTimelinePosts, getTrendingHashtags } from "../../services/linkrAPI";
import { useState, useEffect } from "react";
import PostsContext from "../../contexts/postsContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Feed({ type }) {
    const navigate = useNavigate();
    const { hashtag } = useParams();
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isTimeline, setIsTimeline] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const { arrPosts, setArrPosts } = React.useContext(PostsContext);
    const { arrTrendingHashtags, setArrTrendingHashtags } = React.useContext(PostsContext);
    const { refreshFeed, setRefreshFeed } = React.useContext(PostsContext);
    useEffect(() => {
        if (type === "timeline") {
            setIsLoading(true);
            setIsTimeline(true);
            setTitle("timeline");
            getTimelinePosts()
            .then((answer) => {
            setArrPosts(answer.data[0]);
            setIsLoading(false);
            if (answer.data.length === 0) {
                setIsEmpty(true);
            }
            })
            .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            });
            getTrendingHashtags()
            .then((answer) => {
                setArrTrendingHashtags(answer.data[0]);
            }).catch((error) => {
            console.log(error);
            });
        }
        if (type === "hashtag") {
            setIsTimeline(false);
            setIsLoading(true);
            setTitle(`# ${hashtag}`);
            getHashtagPosts(hashtag)
            .then((answer) => {
            setArrPosts(answer.data[0]);
            setIsLoading(false);
            if (answer.data.length === 0) {
                setIsEmpty(true);
            }
            })
            .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            });
            getTrendingHashtags()
            .then((answer) => {
                setArrTrendingHashtags(answer.data[0]);
            }).catch((error) => {
            console.log(error);
            });
        }
        if (type === "user") {
        }
    }, [refreshFeed]);

    function goHashtag(hashtag){
        if(isLoading === false){
            navigate(`/hashtag/${hashtag}`);
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
                                    userId={post.user.id}
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
                <Trending>
                    <TrendingTitle>trending</TrendingTitle>
                    <TrendingLine></TrendingLine>
                    {arrTrendingHashtags.map((hashtagMap, index) => <TrendingHashtags key={index} onClick={() => goHashtag(hashtagMap)}># {hashtagMap}</TrendingHashtags>)}
                </Trending>
            </Content>
        </>
    );
}
