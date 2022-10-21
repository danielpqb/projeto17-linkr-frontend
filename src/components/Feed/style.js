import styled from "styled-components";

const Container = styled.div`
    width: 620px;
    min-width: 375px;
    margin-top: 45px;
    display: flex;
    flex-direction: column;

    h1 {
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        color: var(--text-emphasis);
        margin-top: 80px; 
    }

    @media (max-width: 620px) {
        width: 100%;
        margin-top: 127px;
        
        h1 {
            margin-top: 20px;
            margin-left: 20px;
        }
    }
`

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

    svg:hover, img:hover{
        filter: brightness(0.6);
    }

    @media (max-width: 620px) {
        border-radius: 0;
        height: 232px;
    }
`

export {
    Container,
    Loading
}