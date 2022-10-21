import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from 'react-icons/fi';

import { Container, UserLogo } from "./style";
import SearchBar from "./Searchbar/index";

export default function TopBar() {
    const imgSrc = "https://static1.personality-database.com/profile_images/c192170f01b245a1a180eb77aa6bb40f.png";
    const navigate = useNavigate();

    return (
        <Container>
            <h1 onClick={() => navigate('/feed')}>linkr</h1>
            <SearchBar />
            <UserLogo>
                <FiChevronDown />
                <img src={imgSrc} alt="" />
            </UserLogo>
        </Container>
    )
};
