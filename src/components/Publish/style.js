import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    min-height: 210px;
    background-color: white;
    border-radius: 16px;
    margin: 50px 0 30px 0;
    
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 620px) {
        height: 170px;
        border-radius: 0;
        margin: 25px 0 16px 0;
    }
`

export {
    Container
}