import { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineComment } from "react-icons/ai";

export default function CommentButton({ onClick, numberOfComments }) {
  useEffect(() => {}, []);

  return (
    <Container>
      <>
        <Comment
          onClick={() => {
            onClick();
          }}
        />
        <p>{numberOfComments}</p>
      </>
    </Container>
  );
}

const Container = styled.button`
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

const Comment = styled(AiOutlineComment)`
  & {
    color: #fff;
    font-size: 25px;
  }

  &:hover {
    cursor: pointer;
  }
`;
