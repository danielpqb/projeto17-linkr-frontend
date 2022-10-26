import styled from "styled-components";

const StyledButton = styled.button`
    width: 110px;
    height: 30px;
    border-radius: 5px;
    border: none;
    transition: filter 400ms;

    &:hover{
        cursor: pointer;
        filter: brightness(0.6);
    }

    background-color: ${props => props.followed? '#ffffff' : '#1877F2'};
    color: ${props => props.followed? '#1877F2' : '#ffffff'};
`

export { StyledButton }