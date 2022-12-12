import styled from "styled-components"

export default function FooterSession({ title, poster, day }) {
    return (
        <FooterContainer data-test="footer">
            <Poster>
                <img src={poster} alt={title} />
            </Poster>
            <Title>
                <p>{title}</p>
                {(day) && <p>{day}</p>}
            </Title>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    display: flex;
    position: fixed;

    align-items: center;
    justify-content: space-around;
        
    bottom: 0;
    left: 0;

    width: 100%;
    height: 117px;

    background-color:#C3CFD9;
`

const Poster = styled.div`
    border: 6px solid white;
    border-radius: 3px;

    margin-left: 20px;

    box-shadow: 0 0 5px gray;

    height: 65%;
    aspect-ratio: 8/11.95;

    > img{
        width: 100%;
    }
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: space-between;

    width: 100%;
    max-height: 100%;

    margin-left: 10px;
    
    color: #293845;

    > p{
        display: flex;
        align-items: center;
        margin: 5px;

        height: 100%;
        font-size: clamp(10%, 120%, 26px);
    }
`