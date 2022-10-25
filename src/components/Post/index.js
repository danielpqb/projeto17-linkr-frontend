import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TiPencil } from "react-icons/ti";

import { getPostDataById, updatePostHashtags, updatePostText } from "../../services/linkrAPI";
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
import createErrorMessage from "../functions/createErrorMessage";

export default function Post({ userId, userImage, userName, postText, metadata, postLink, postId }) {
  const { userData, setAlert } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
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

  function getPostsDataByUserId() {
    getPostDataById(postId)
      .then((res) => {
        navigate(`/user/${res.data.postData.userId}`);
        localStorage.setItem(
          "targetUser",
          JSON.stringify({
            id: res.data.user.id,
            name: res.data.user.name,
          })
        );
      })
      .catch((error) => {
        const message = createErrorMessage(error);

        setAlert({
          show: true,
          message: message,
          type: 0,
          doThis: () => {},
          color: "rgba(200,0,0)",
          icon: "alert-circle",
        });
        return;
      });
  }

  function handleForm(e) {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      setLoading(true);
      updatePost();
      setLoading(false);
      return;
    }
    setChengeableText({ text: e.target.value });
  }

  return (
    <Container>
      <PostHeader>
        <img
          src={userImage}
          alt="User profile"
          onClick={() => {
            getPostsDataByUserId();
          }}
        />
        <LikeButton userId={userData.id} postId={postId} />
      </PostHeader>

      <PostContent>
        <PostUserName>
          <div
            onClick={() => {
              getPostsDataByUserId();
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
            disabled={loading}
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
                navigate(`/hashtag/${tag.substring(1)}`);
                setRefreshFeed(!refreshFeed);
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
