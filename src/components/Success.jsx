import styled from "styled-components"

export default function Success(props){
    return(
        <SuccessContainer>
            {props.children}
        </SuccessContainer>
    )
}

const SuccessContainer = styled.div`
    margin-top: 67px;
    margin-bottom: 150px;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: space-around;

    font-family: 'Roboto', sans-serif;
    
    > p {
        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;

        width: 50%;

        font-size: 24px;
        font-weight: 700;
        color: #247A6B;
    }

    > div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 80%;
        height: 80px;

        margin: 10px;

        > h2{
            margin: 0;
            color: #293845;
            font-weight: 700;
        }

        > p{
            margin: 0;
        }
    }

    > a{
        margin-top: 50px;

        width: 225px;
        height: 42px;

        > button{
            width: 100%;
            height: 100%;

            color: white;

            font-size: 18px;

            background-color: #E8833A;

            border: none;
            border-radius: 5px;
        }
    }
`