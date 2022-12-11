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
    justify-content: center;
    
    > p {
        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;

        width: 50%;
        margin: 50px;

        font-size: 24px;
        font-weight: 700;
        color: #247A6B;
    }
`