import React from "react";
import { FiChevronDown } from 'react-icons/fi';

import { Container, UserLogo } from "./style";

export default function TopBar() {
    const imgSrc = "https://static1.personality-database.com/profile_images/c192170f01b245a1a180eb77aa6bb40f.png"

    return (
        <Container>
            <h1>linkr</h1>
            <UserLogo>
                <FiChevronDown />
                <img src={imgSrc} alt="" />
            </UserLogo>
        </Container>
    )
};