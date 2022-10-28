import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostsContext from "../../contexts/postsContext";
import React from "react";

export default function Comment({ commentData }) {
  const navigate = useNavigate();
  const { isLoading, setInfiniteScrollIndex } = React.useContext(PostsContext);
  return (
    <Container>
      <Photo>
        <img src={commentData.userPhoto} alt="" onClick={() => {
                if (isLoading === false) {
                  setInfiniteScrollIndex(0);
                  localStorage.setItem(
                    "targetUser",
                    JSON.stringify({
                      id: commentData.userId,
                      name: commentData.userName,
                    })
                  );
                  navigate(`/user/${commentData.userId}`);
                }
              }}/>
      </Photo>

      <Content>
        <Title>
          <Name onClick={() => {
                if (isLoading === false) {
                  setInfiniteScrollIndex(0);
                  localStorage.setItem(
                    "targetUser",
                    JSON.stringify({
                      id: commentData.userId,
                      name: commentData.userName,
                    })
                  );
                  navigate(`/user/${commentData.userId}`);
                }
              }}
              >{commentData.userName}</Name>
          <ExtraInfo>{commentData.userId === commentData.postUserId && "• post’s author"}</ExtraInfo>
          <ExtraInfo>{commentData.following && "• following"}</ExtraInfo>
        </Title>

        <Text>{commentData.text}</Text>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  & {
    display: flex;

    border-bottom: 1px solid #353535;

    padding: 15px 0px;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Photo = styled.div`
  & {
  }

  img {
    object-fit: cover;
    border-radius: 50%;

    width: 40px;
    height: 40px;

    margin-right: 15px;
  }
`;

const Content = styled.div`
  & {
    display: flex;
    flex-direction: column;

    width: 100%;
  }

  div {
    align-self: flex-start;
  }
`;

const Title = styled.div`
  & {
  }
`;

const Name = styled.div`
  & {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }
  :hover {
    cursor: pointer;
    filter: brightness(0.6);
  }
`;

const ExtraInfo = styled.div`
  & {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;

    margin-left: 5px;
  }
`;

const Text = styled.div`
  & {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
  }
`;
