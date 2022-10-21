import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from 'react-icons/fi';

import { Container, UserLogo } from "./style";
import UserContext from "../../contexts/userContext";
import SearchBar from "./Searchbar/index";

export default function TopBar() {
    const { userData } = useContext(UserContext);
    const imgSrc = userData.imageUrl;
    const navigate = useNavigate();

    return (
        <Container>
            <h1 onClick={() => navigate('/timeline')}>linkr</h1>
            <SearchBar />
            <UserLogo>
                <FiChevronDown />
                <img src={imgSrc} alt="" />
            </UserLogo>
        </Container>
    )
};
