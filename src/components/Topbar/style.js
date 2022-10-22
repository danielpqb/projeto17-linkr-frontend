import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 72px;
  padding: 0 30px;
  background-color: var(--topbar-grey);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;

  h1 {
    font-family: "Passion One", sans-serif;
    font-weight: 700;
    font-size: 49px;
    letter-spacing: 0.05em;
    color: var(--text-emphasis);
  }

  h1:hover {
    cursor: pointer;
    filter: brightness(0.6);
  }
`;

const UserLogo = styled.div`
  position: relative;
  font-size: 30px;
  color: var(--text-emphasis);
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 10px;
  }

  svg:hover,
  img:hover {
    cursor: pointer;
    filter: brightness(0.6);
  }
`;

const DropDownMenu = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 100%;
    right: 0px;

    width: 150px;
    height: 80%;

    z-index: 2;

    background-color: var(--topbar-grey);

    border-radius: 0px 0px 0px 25px;
  }

  div:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const OutOfRange = styled.div`
  & {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    z-index: 1;
  }
`;

export { Container, UserLogo, DropDownMenu, OutOfRange };
