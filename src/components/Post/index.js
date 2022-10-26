import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TiPencil } from "react-icons/ti";

import { updatePostHashtags, updatePostText } from "../../services/linkrAPI";
import UserContext from "../../contexts/userContext";
import {
  Container,
  PostHeader,
  PostContent,
  MetadataContent,
  MetadataDiv,
  MetadataLink,
  MetadataText,
  MetadataTitle,
  PostText,
  PostUserName,
  Input,
} from "./style";
import DeleteButton from "../Common/DeleteButton";
import LikeButton from "../LikeButton";
import checkHashtags from "../functions/checkHashtags";
import { ReactTagify } from "react-tagify";
import PostsContext from "../../contexts/postsContext";

export default function Post({ userId, userImage, userName, postText, metadata, postLink, postId, updateTrending, setUpdateTrending }) {
  const { userData, setAlert } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, setIsLoading } = React.useContext(PostsContext);
  const [consolidatedText, setConsolidatedText] = useState({ text: postText });
  const [changeableText, setChengeableText] = useState({ text: postText });
  const { refreshFeed, setRefreshFeed } = React.useContext(PostsContext);

  const navigate = useNavigate();

  const isEditable = userData.id === userId;

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setChengeableText(consolidatedText);
      setIsEditing(false);
    }
  });

  function changeEditing() {
    setChengeableText(consolidatedText);
    setIsEditing(!isEditing);
  }

  async function updatePost() {
    try {
      await updatePostText(postId, changeableText);
      await updatePostHashtags(postId, checkHashtags(changeableText.text));
      setConsolidatedText(changeableText);
      setIsEditing(false);
      setTimeout(() => setUpdateTrending(!updateTrending), 200);
    } catch (error) {
      let err = error;
      if (error.response?.data.message) {
        err = error.response?.data.message;
      }
      setAlert({
        show: true,
        message: err.toString(),
        type: 0,
        doThis: () => {},
        color: "rgba(200,0,0)",
        icon: "alert-circle",
      });
    }
  }

  function handleForm(e) {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      setIsLoading(true);
      updatePost();
      setIsLoading(false);
      return;
    }
    setChengeableText({ text: e.target.value });
  }

  return (
    <Container>
      <PostHeader>
        <img src={userImage} alt="User profile" 
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src="https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg";
          }} 
          onClick={() => {
            if(isLoading === false){
              navigate(`/user/${userId}`);
            }
          }}
        />
        <LikeButton userId={userData.id} postId={postId} />
      </PostHeader>

      <PostContent>
        <PostUserName>
          <div
            onClick={() => {
              if(isLoading === false){
                navigate(`/user/${userId}`);
              }
            }}
          >
            {userName}
          </div>

          {isEditable ? (
            <div>
              <TiPencil onClick={changeEditing} />
              <DeleteButton postId={postId} />
            </div>
          ) : (
            <></>
          )}
        </PostUserName>
        {isEditing ? (
          <Input
            name="text"
            type="text"
            autoFocus={true}
            disabled={isLoading}
            value={changeableText.text}
            onChange={handleForm}
            required
          />
        ) : (
          <PostText>
            <ReactTagify
              tagStyle={{
                color: "#FFFFFF",
                fontWeight: 700,
                cursor: "pointer",
              }}
              tagClicked={(tag) => {
                if(isLoading === false){
                  navigate(`/hashtag/${tag.substring(1)}`);
                  setRefreshFeed(!refreshFeed);
                }
              }}
            >
              {consolidatedText.text}
            </ReactTagify>
          </PostText>
        )}
        <MetadataDiv
          onClick={() => {
            window.open(postLink);
          }}
        >
          <MetadataContent>
            <MetadataTitle>{metadata.title}</MetadataTitle>
            <MetadataText>{metadata.description}</MetadataText>
            <MetadataLink>{postLink}</MetadataLink>
          </MetadataContent>
          <img src={metadata.image} alt="" />
        </MetadataDiv>
      </PostContent>
    </Container>
  );
}
