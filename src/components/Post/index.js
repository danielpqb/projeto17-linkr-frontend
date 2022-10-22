import React from "react";
import { useState, useContext } from "react";
import { TiPencil, TiTrash } from "react-icons/ti";

import UserContext from "../../contexts/userContext";
import { Container, MetadataContent, MetadataDiv, MetadataLink, MetadataText, MetadataTitle, PostText, PostUserName } from "./style";

export default function Post({ userId, userImage, userName, postText, metadata, postLink, postId}) {
    const { userData } = useContext(UserContext);
    const [ isEditing, setIsEditing ] = useState(false);

    const isEditable = userData.id === userId;

    return (
        <Container>
            <img src={userImage} alt='User profile image'/>
            <div>
                <PostUserName>
                    {userName}
                    {isEditable? 
                        <div>
                            <TiPencil onClick={() => setIsEditing(!isEditing)}/>
                            <TiTrash onClick={() => alert(`Aqui vai deletar o post id:${postId}!`)}/>
                        </div>
                        :
                        <></>
                    }
                </PostUserName>
                {isEditing?
                    <PostText>Ôvoeditah se for o userId{userId}</PostText>
                    :
                    <PostText>{postText}</PostText>
                }
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
