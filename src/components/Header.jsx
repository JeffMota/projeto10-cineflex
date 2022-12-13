import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import backBtn from "../assets/img/back.png"

export default function Header({back}) {

    const navigate = useNavigate()

    function goBack(){
        navigate(back)
    }

    return (
        <>
            <HeaderContainer>
                {back && 
                    <BackContainer onClick={goBack}>
                        <img src={backBtn}></img>
                    </BackContainer>
                }
                CINEFLIX
            </HeaderContainer>
        </>
    )
}

const HeaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 34px;
    color: #E8833A;

    width: 100%;
    height: 67px;
    background-color: #C3CFD9;
    
`

const BackContainer = styled.div`
    width: 50px;
    height: 50px;

    left: 20px;
    
    position: fixed;

    > img{
        width: 100%;
    }
`