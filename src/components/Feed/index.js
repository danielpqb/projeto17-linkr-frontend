import React from "react";

import TopBar from "../Topbar";
import { Container } from "./style";

export default function Feed({title}) {
    return (
        <>
            <TopBar />
            <Container>
                <h1>{title}</h1>
            </Container>
        </>
    )
};