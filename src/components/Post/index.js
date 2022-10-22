import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { TiPencil, TiTrash } from "react-icons/ti";

import UserContext from "../../contexts/userContext";
import { Container, PostHeader, PostContent, MetadataContent, MetadataDiv, MetadataLink, MetadataText, MetadataTitle, PostText, PostUserName, Input } from "./style";
import LikeButton from "../LikeButton";

export default function Post({ userId, userImage, userName, postText, metadata, postLink, postId}) {
    const { userData } = useContext(UserContext);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ text, setText ] = useState({text: postText});
    const inputRef = useRef(null);

    const isEditable = userData.id === userId;

    useEffect(() => {
        if (isEditing) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    function handleForm(e) {
        setText({text: e.target.value});
    }

    return (
        <Container>
            <PostHeader>
                <img src={userImage} alt='User profile image'/>
                <LikeButton userId={userData.id} postId={postId}/>
            </PostHeader>
            
            <PostContent>
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
                    <Input
                        placeholder="http:// ..."
                        name="text"
                        type="text"
                        ref={inputRef}
                        value={text.text}
                        onChange={handleForm}
                        required
                    />
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
            </PostContent>
        </Container>
    )
}
