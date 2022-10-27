import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TiPencil } from "react-icons/ti";
import { TbSend } from "react-icons/tb";

import { getCommentsDataByPostId, postNewComment, updatePostHashtags, updatePostText } from "../../services/linkrAPI";
import UserContext from "../../contexts/userContext";
import {
  Container,
  PostContainer,
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
  PostComments,
  PostNewComment,
} from "./style";
import DeleteButton from "../Common/DeleteButton";
import LikeButton from "../LikeButton";
import checkHashtags from "../functions/checkHashtags";
import { ReactTagify } from "react-tagify";
import PostsContext from "../../contexts/postsContext";
import CommentButton from "../CommentButton/CommentButton";
import Comment from "../Comment/Comment";
import createErrorMessage from "../functions/createErrorMessage";

export default function Post({
  userId,
  userImage,
  userName,
  postText,
  metadata,
  postLink,
  postId,
  updateTrending,
  setUpdateTrending,
}) {
  const { userData, setAlert } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, setIsLoading } = React.useContext(PostsContext);
  const [consolidatedText, setConsolidatedText] = useState({ text: postText });
  const [changeableText, setChengeableText] = useState({ text: postText });
  const { refreshFeed, setRefreshFeed } = React.useContext(PostsContext);
  const [idPromise, setIdPromise] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [isPostCommentsOpen, setIsPostCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [reloadPost, setReloadPost] = useState(false);
  const [maxComments] = useState(5);

  const navigate = useNavigate();

  const isEditable = userData.id === userId;

  useEffect(() => {
    if (userData.id !== undefined) {
      setIdPromise(true);
    }
  }, [userData]);

  useEffect(() => {
    getCommentsDataByPostId(postId)
      .then((res) => {
        if (res.data?.commentsData) {
          setCommentsData(res.data.commentsData);
        }
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
      });
  }, [postId, setAlert, reloadPost]);

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
      <PostContainer>
        <PostHeader>
          <img
            src={userImage}
            alt="User profile"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "https://static.vecteezy.com/ti/vetor-gratis/p1/2318271-icone-do-perfil-do-usuario-gr%C3%A1tis-vetor.jpg";
            }}
            onClick={() => {
              if (isLoading === false) {
                localStorage.setItem(
                  "targetUser",
                  JSON.stringify({
                    id: userId,
                    name: userName,
                  })
                );
                navigate(`/user/${userId}`);
              }
            }}
          />
          {idPromise ? (
            <>
              <LikeButton userId={userData.id} postId={postId} />
              <CommentButton
                numberOfComments={commentsData?.length}
                onClick={() => {
                  setIsPostCommentsOpen(!isPostCommentsOpen);
                }}
              />
            </>
          ) : (
            <></>
          )}
        </PostHeader>

        <PostContent>
          <PostUserName>
            <div
              onClick={() => {
                if (isLoading === false) {
                  localStorage.setItem(
                    "targetUser",
                    JSON.stringify({
                      id: userId,
                      name: userName,
                    })
                  );
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
                  if (isLoading === false) {
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
      </PostContainer>

      {isPostCommentsOpen && (
        <>
          <PostComments>
            {commentsData.map((commentData, index) => {
              if (index >= maxComments) {
                return <React.Fragment key={index}></React.Fragment>;
              }
              return (
                <React.Fragment key={index}>
                  <Comment commentData={commentData}></Comment>
                </React.Fragment>
              );
            })}
            <PostNewComment>
              <img src={userData.imageUrl} alt=""></img>
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  postNewComment({ postId: postId, text: newCommentText }, localStorage.getItem("userToken"))
                    .then(() => {
                      setNewCommentText("");
                      setReloadPost(!reloadPost);
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
                    });
                }}
              >
                <input
                  placeholder="write a comment..."
                  onChange={(e) => {
                    setNewCommentText(e.target.value);
                  }}
                  value={newCommentText}
                  required
                />
                <button type="submit">
                  <TbSend />
                </button>
              </form>
            </PostNewComment>
          </PostComments>
        </>
      )}
    </Container>
  );
}
