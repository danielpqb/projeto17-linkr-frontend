import { useEffect } from "react";
import styled from "styled-components";

export default function Comment(commentData) {
  useEffect(() => {}, []);

  return (
    <Container>
      <Photo>
        <img src={commentData.userPhoto} alt="" />
      </Photo>

      <Content>
        <Title>
          <Name>{commentData.userName}</Name>
          <ExtraInfo>{commentData.extraInfo}</ExtraInfo>
        </Title>

        <Text>{commentData.text}</Text>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  outline: none;
  border: none;

  background-color: transparent;

  .toolTip {
    color: #505050 !important;
    font-family: "Lato", sans-serif !important;
    font-weight: 700 !important;
    font-size: 0.685rem !important;

    span {
      background-color: #fff !important;
    }
  }

  p {
    color: #fff;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 0.685rem;
    line-height: 0.83rem;
    text-align: center;
  }
`;

const Photo = styled.div`
  & {
  }
`;

const Content = styled.div`
  & {
  }
`;

const Title = styled.div`
  & {
  }
`;

const Name = styled.div`
  & {
  }
`;

const ExtraInfo = styled.div`
  & {
  }
`;

const Text = styled.div`
  & {
  }
`;
