import styled from "styled-components"

export default function Header() {
    return (
        <>
            <HeaderContainer>
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