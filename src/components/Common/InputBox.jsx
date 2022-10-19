import React from "react";
import styled from "styled-components";

export default function InputBox({
  name,
  placeholder,
  onChange,
  value,
  type,
  height,
}) {
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
