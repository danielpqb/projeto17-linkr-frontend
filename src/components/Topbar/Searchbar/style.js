import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    max-width: 560px;
    height: 45px;
    border-radius: 8px;
    background-color: white;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    position: relative;
    z-index: initial;

    svg {
        font-size: 25px;
        position: absolute;
        right: 40px;
        color: #2C4D83;
    }

    input {
        height: 100%;
        width: 100%;
        border: none;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        font-size: 19px;
        color: #515151;
        background-color: transparent;
        z-index: 1;
        &::placeholder{
            color: #C6C6C6;
        }
        &:focus{
            outline:none;
        }
    }

    @media (max-width: 620px) {
        position: fixed;
        top: 80px;
        left: 0;
        width: calc(100VW - 20px);
        margin: 0 10px;
    }
`

const SearchResults = styled.div`
    width: 100%;
    min-height: 100%;
    max-height: 300px;
    overflow-y: scroll;
    position: absolute;
    left: 0;
    top: 0;
    padding: 45px 10px 15px 10px;
    z-index: -1;
    background-color: #e7e7e7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const StyledResult = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    transition: 500ms;
    padding: 5px;
    border-radius: 5px;

    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }

    h2{
        font-size: 19px;
        color: #515151;
        margin-left: 12px;
    }

    h3{
        margin-left: 7px;
        font-size: 19px;
        color: #C5C5C5;
    }

    &:hover{
        cursor: pointer;
        background-color: #ccc9c9;
        padding-left: 15px;
    }
`

export {
    Container,
    SearchResults,
    StyledResult
}