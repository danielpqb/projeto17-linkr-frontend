import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import { Container, DropDownMenu, OutOfRange, UserLogo } from "./style";
import UserContext from "../../contexts/userContext";
import SearchBar from "./Searchbar/index";

export default function TopBar() {
  const { userData, setUserData } = useContext(UserContext);

  const [isMenuAppering, setIsMenuAppering] = useState(false);

  const imgSrc = userData.imageUrl;
  const navigate = useNavigate();

  return (
    <Container>
      <h1 onClick={() => navigate("/timeline")}>linkr</h1>
      <SearchBar />
      <UserLogo
        onClick={() => {
          setIsMenuAppering(!isMenuAppering);
        }}
      >
        {isMenuAppering ? <FiChevronUp /> : <FiChevronDown />}
        <img src={imgSrc} alt="" />
      </UserLogo>
      {isMenuAppering ? (
        <>
          <DropDownMenu>
            <div
              onClick={async () => {
                localStorage.removeItem("userToken");
                setIsMenuAppering(false);
                setUserData({});
                navigate("/");
              }}
            >
              Logout
            </div>
          </DropDownMenu>
          <OutOfRange
            onClick={() => {
              setIsMenuAppering(false);
            }}
          />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
