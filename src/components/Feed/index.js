import React from "react";

import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import { Container } from "./style";
import { getTimelinePosts } from "../../services/linkrAPI";
import { useState, useEffect } from "react";

export default function Feed({type}) {
    const [title, setTitle] = useState('');
    const [refreshDisplay, setRefreshDisplay] = useState(false);
    const [isTimeline, setIsTimeline] = useState(false);
    const [arrPosts, setArrPosts] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        if(type === 'timeline'){
            setIsTimeline(true);
            setTitle('timeline');
            getTimelinePosts(1).then((answer) => {
                setArrPosts(answer.data);
            }).catch((error) => {
                alert(error);
            });
        }
        if(type === 'hashtag'){
          
        }
        if(type === 'profile'){
           
        }
    }, []);
    return (
        <>
            <TopBar />
            <Container>
                <h1>{title}</h1>
                { isTimeline ? (
                    <Publish />
                ) : (
                    <></>
                )}
                {arrPosts.map((post,index) => <Post key={index} userImage={post.user.image} userName={post.user.name}
                postText={post.text} metadata={post.metadata} postLink={post.link}/>)}
            </Container>
        </>
    )
};