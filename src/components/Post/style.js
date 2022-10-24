import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: var(--box-grey);
  border-radius: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  padding: 20px;

  display: flex;

  svg:hover,
  img:hover {
    cursor: pointer;
    filter: brightness(0.6);
  }

  @media (max-width: 620px) {
    border-radius: 0;
  }
`;

const PostHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-right: 18px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    margin-top: 20px;
  }

  @media (max-width: 620px) {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;

const PostContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PostUserName = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    margin-left: 10px;
  }

  div:nth-child(1):hover {
    cursor: pointer;
  }

  @media (max-width: 620px) {
    font-size: 17px;
    line-height: 20px;
  }
`;

const PostText = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  margin-bottom: 15px;

  @media (max-width: 620px) {
    font-size: 15px;
    line-height: 18px;
  }
`;

const MetadataDiv = styled.div`
  width: 503px;
  min-height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;

  :hover {
    cursor: pointer;
  }

  img {
    width: 153px;
    height: 155px;
    object-fit: cover;
    object-position: center;
    margin-right: 0px;
    border-top-right-radius: 11px;
    border-bottom-right-radius: 11px;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin-right: 20px;
    min-height: 115px;
    img {
      width: 100px;
      height: 115px;
      object-fit: cover;
    }
  }
`;

const MetadataContent = styled.div`
  width: 350px;
  min-height: 155px;
  box-sizing: border-box;
  padding: 22px;

  @media (max-width: 620px) {
    width: 66%;
    min-height: 115px;
  }
`;

const MetadataTitle = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #cecece;
  margin-bottom: 5px;

  @media (max-width: 620px) {
    font-size: 11px;
    line-height: 13px;
  }
`;

const MetadataText = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9b9595;
  margin-bottom: 13px;

  @media (max-width: 620px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

const MetadataLink = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #cecece;

  @media (max-width: 620px) {
    font-size: 9px;
    line-height: 11px;
  }
`;

const Input = styled.textarea`
    position: relative;
    width: 100%;
    resize: none;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px 0 7px 13px;
    border: none;
    background-color: rgba(239, 239, 239, 1);
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 15px;

    &:focus{
        outline:none;
    }
`;

export {
    Container,
    PostHeader,
    PostContent,
    PostUserName,
    PostText,
    MetadataDiv,
    MetadataContent,
    MetadataTitle,
    MetadataLink,
    MetadataText,
    Input
}
