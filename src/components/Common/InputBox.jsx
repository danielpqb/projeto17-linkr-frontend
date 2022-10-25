import React, { useState } from "react";
import styled from "styled-components";

import { MdImage, MdOutlineEmail, MdPerson } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";

import CheckBox from "./CheckBox";

export default function InputBox({ name, placeholder, type, onChange, value, height = "60px", hasCheckBox, hasIcon }) {
  const [isChecked, setIsChecked] = useState(false);

  if (hasIcon) {
    switch (name) {
      case "name":
        hasIcon = <MdPerson />;
        break;
      case "email":
        hasIcon = <MdOutlineEmail />;
        break;
      case "password":
        hasIcon = <IoKeyOutline />;
        break;
      case "imageUrl":
        hasIcon = <MdImage />;
        break;
      default:
        hasIcon = <AiOutlineFileText />;
        break;
    }
  }

  type = type === "password" && isChecked ? "text" : type;

  return (
    <Container height={height}>
      {hasIcon && <ShowIcon>{hasIcon}</ShowIcon>}
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        required
        value={value}
        onChange={onChange}
      />
      {hasCheckBox && (
        <ShowPassword>
          <CheckBox size={"35px"} color={"#555555"} isChecked={isChecked} setIsChecked={setIsChecked} />
          <div>Show</div>
        </ShowPassword>
      )}
    </Container>
  );
}

const Container = styled.div`
  & {
    background: #ffffff;
    border-radius: 5px;
    height: ${({ height }) => height};
    margin: 10px 0px;
  }

  input {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #6d6d6d;

    padding: 10px;

    border: none;
    outline: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  input::placeholder {
    color: #afafaf;
  }
`;

const ShowPassword = styled.div`
  & {
    flex-direction: column;
  }

  div:nth-child(2) {
    color: #9f9f9f;
    font-size: 12px;
  }
`;

const ShowIcon = styled.div`
  & {
    color: rgb(70, 70, 70);
    font-size: 30px;
    margin: 0px 5px;
  }
`;
