import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    min-height: 280px;
    background-color: var(--box-grey);
    border-radius: 16px;
    margin-bottom: 16px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 620px) {
        border-radius: 0;
    }
`

export {
    Container
}