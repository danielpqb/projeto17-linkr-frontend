import styled from "styled-components";

export default function LoginHeader() {
  return (
    <Container>
      <Logo>linkr</Logo>
      <Content>save, share and discover the best links on the web</Content>
    </Container>
  );
}

const Container = styled.div`
  & {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    background: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    height: 190px;

    flex-direction: column;
  }
`;

const Logo = styled.div`
  & {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 76px;
    letter-spacing: 0.05em;
  }
`;

const Content = styled.div`
  & {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 34px;
    text-align: center;

    width: 250px;
  }
`;
