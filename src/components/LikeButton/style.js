import styled from "styled-components";

import { RiHeartLine, RiHeartFill } from "react-icons/ri";

export const StyledLikeButton = styled.button`
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

export const HeartLine = styled(RiHeartLine)`
  color: #fff;
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;

export const HeartFill = styled(RiHeartFill)`
  color: #ac0000 !important;
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;
