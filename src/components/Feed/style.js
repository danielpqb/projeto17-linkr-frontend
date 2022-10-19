import styled from "styled-components";

const Container = styled.div`
    width: 620px;
    margin-top: 72px;
    display: flex;

    h1 {
        font-family: 'Oswald', sans-serif;
        font-weight: 700;
        font-size: 43px;
        color: var(--text-emphasis);
        margin-top: 80px;
        margin-left: 20px;
    }

    @media (max-width: 620px) {
        width: 100%;
        
        h1 {
            margin-top: 20px;
        }
    }
`

export {
    Container
}