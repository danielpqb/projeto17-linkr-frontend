import React, { useState } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";

export default function InputBox({ name, placeholder, onChange, value, type, height, hasCheckBox }) {
  const [isChecked, setIsChecked] = useState(false);

  type = type === "password" && isChecked ? "text" : type;

  return (
    <Container height={height}>
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
    height: ${({ height }) => (height ? height : "60px")};
    margin: 10px 0px;
  }

  input {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    color: #9f9f9f;

    padding: 10px;

    border: none;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  input::placeholder {
    color: #9f9f9f;
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
