import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 72px;
    padding: 0 30px;
    background-color: var(--topbar-grey);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1{
        font-family: 'Passion One', sans-serif;
        font-weight: 700;
        font-size: 49px;
        letter-spacing: 0.05em;
        color: var(--text-emphasis);
    }

    h1:hover{
        cursor: pointer;
        filter: brightness(0.6);
    }
`;

const UserLogo = styled.div`
    font-size: 30px;
    color: var(--text-emphasis);
    display: flex;
    align-items: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-left: 10px;
    }

    svg:hover, img:hover{
        cursor: pointer;
        filter: brightness(0.6);
    }
`

export {
    Container,
    UserLogo
}