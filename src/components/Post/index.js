import React from "react";

import { Container, MetadataContent, MetadataDiv, MetadataText, MetadataTitle, PostText, PostUserName } from "./style";

export default function Post({ userImage, userName, postText, metadata,/*  metadataTitle, metadataText, */ postLink}) {
    return (
        <Container>
            <img src={userImage} alt='User profile image'/>
            <div>
                <PostUserName>{userName}</PostUserName>
                <PostText>{postText}</PostText>
                <MetadataDiv>
                    <MetadataContent>
                        <MetadataTitle>{metadata.title}</MetadataTitle>
                        <MetadataText>{metadata.description}</MetadataText>
                    </MetadataContent>
                    <img src={metadata.image}/>
                </MetadataDiv>
            </div>
        </Container>
    )
}