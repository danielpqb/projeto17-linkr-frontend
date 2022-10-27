import styled from "styled-components";

const Container = styled.div`
  width: 620px;
  min-width: 375px;
  margin-top: 45px;
  display: flex;
  flex-direction: column;

  @media (max-width: 620px) {
    width: 100%;
    margin-top: 127px;
  }
`;

const Header = styled.div`
  display: flex;
  padding-top: 40px;
  align-items: flex-end;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: flex-end;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
  }

  h1 {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    color: var(--text-emphasis);
    margin-top: 80px;
  }

  @media (max-width: 620px) {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    h1 {
      margin-top: 20px;
      margin-left: 20px;
    }
  }
`;

const Loading = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: var(--box-grey);
  border-radius: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg:hover,
  img:hover {
    filter: brightness(0.6);
  }

  @media (max-width: 620px) {
    border-radius: 0;
    height: 232px;
  }
`;

const RefreshNewPosts = styled.div`
  width: 100%;
  min-height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 26px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    filter: brightness(0.6);
    cursor: pointer;
  }

  @media (max-width: 620px) {
    border-radius: 0;
    height: 232px;
  }
`;

const RefreshIcon = styled.div`
  margin-left: 4px;
  margin-top: 2px;
  font-size: 20px;
  line-height: 21px;
`;

const Trending = styled.div`
  width: 300px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  margin-left: 25px;
  box-sizing: border-box;
  padding: 10px 0px 25px 0px;
  margin-top: 45px;

  @media (max-width: 980px) {
    display: none;
  }
`;

const TrendingLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #484848;
`;
const TrendingTitle = styled.div`
  margin-left: 16px;
  margin-bottom: 12px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
`;

const TrendingHashtags = styled.div`
  margin-left: 16px;
  margin-bottom: 7px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  letter-spacing: 0.05em;
  :hover {
    filter: brightness(0.6);
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  & > div {
    display: flex;
  }
`;

const HeaderRepost = styled.div`
  background: #1e1e1e;
  position: relative;
  width: 100%;
  max-width: 620px;
  height: 60px;
  top: 23px;
  z-index: -1;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 13px;
  padding-bottom: 35px;
  i {
    color: #ffffff;
    padding: 3px 2px 3px 15px;
  }
  p {
    color: #ffffff;
    font-size: 11px;
    padding: 6px 0px;
    margin-left: 6px;
  }
`;

export {
  Container,
  HeaderRepost,
  Header,
  Loading,
  Content,
  Trending,
  TrendingLine,
  TrendingTitle,
  TrendingHashtags,
  RefreshNewPosts,
  RefreshIcon,
};
