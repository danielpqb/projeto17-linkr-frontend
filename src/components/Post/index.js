import React from "react";

import { Container, MetadataContent, MetadataDiv, MetadataLink, MetadataText, MetadataTitle, PostText, PostUserName } from "./style";

export default function Post({ userImage, userName, postText, metadata, postLink}) {
    return (
        <Container>
            <img src={userImage} alt='User profile image'/>
            <div>
                <PostUserName>{userName}</PostUserName>
                <PostText>{postText}</PostText>
                <MetadataDiv onClick={()=>{window.open(postLink)}}>
                    <MetadataContent>
                        <MetadataTitle>{metadata.title}</MetadataTitle>
                        <MetadataText>{metadata.description}</MetadataText>
                        <MetadataLink>{postLink}</MetadataLink>
                    </MetadataContent>
                    <img src={metadata.image}/>
                </MetadataDiv>
            </div>
        </Container>
    )
}
