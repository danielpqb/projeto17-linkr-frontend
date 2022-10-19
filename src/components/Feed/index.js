import React from "react";

import TopBar from "../Topbar";
import Publish from "../Publish";
import Post from "../Post";
import { Container } from "./style";

export default function Feed({title}) {
    return (
        <>
            <TopBar />
            <Container>
                <h1>{title}</h1>
                <Publish />
                <Post />
            </Container>
        </>
    )
};