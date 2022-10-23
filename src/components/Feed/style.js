import styled from "styled-components";

const Container = styled.div`
    width: 620px;
    min-width: 375px;
    margin-top: 45px;
    display: flex;
    flex-direction: column;

    h1 {
        margin-bottom: 50px;
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

const Trending = styled.div`
    width: 300px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
    margin-left: 25px;
    box-sizing: border-box;
    padding: 10px 0px 25px 0px;
    margin-top: 215px;

    @media (max-width: 980px) {
        display: none;
    }
`

const TrendingLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;
`
const TrendingTitle = styled.div`
    margin-left: 16px;
    margin-bottom: 12px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #FFFFFF;
`

const TrendingHashtags = styled.div`
    margin-left: 16px;
    margin-bottom: 7px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    color: #FFFFFF;
    letter-spacing: 0.05em;
    :hover{
        filter: brightness(0.6);
        cursor: pointer;
    }
`

const Content = styled.div`
    display: flex;
    height: 100%;
`




export {
    Container,
    Loading,
    Content,
    Trending,
    TrendingLine,
    TrendingTitle,
    TrendingHashtags
}