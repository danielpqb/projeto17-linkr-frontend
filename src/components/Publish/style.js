import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: 210px;
  background-color: white;
  border-radius: 16px;
  margin: 0px 0 30px 0;
  display: flex;

  @media (max-width: 620px) {
    height: 170px;
    border-radius: 0;
    margin: 25px 0 16px 0;
  }
`;

export const LeftDiv = styled.div`
  height: 210px;
  width: 10%;
  display: flex;
  margin-left: 18px;
  margin-top: 16px;

  img {
    max-width: 50px;
    max-height: 50px;
    border-radius: 26.5px;
  }
`;

export const RightDiv = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;

  h2 {
    margin-top: 21px;
    margin-bottom: 20px;
    width: 100%;
    font-size: 20px;
    color: rgba(112, 112, 112, 1);
  }
`;

export const Form = styled.form`
  position: relative;
  height: 140px;
  width: 100%;
`;

export const Input = styled.input`
  position: relative;
  width: 100%;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 5px 0 7px 13px;
  border: none;
  background-color: rgba(239, 239, 239, 1);
  font-size: 15px;

  &::placeholder {
    position: absolute;
    color: rgba(148, 148, 148, 1);
  }

  &:first-child {
    height: 30px;
  }

  &:nth-child(2) {
    height: 66px;
  }
`;

export const Button = styled.button`
  width: 112px;
  height: 31px;
  color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  font-weight: 700;
  font-size: 14px;
  background-color: rgba(24, 119, 242, 1);
  border: none;
  position: absolute;
  right: 0;
  bottom: 0;

  &:hover {
    cursor: pointer;
  }
`;
