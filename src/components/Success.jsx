import { Navigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function Success(props) {

    const { testObjeto } = useParams()
    const {successObject} = props
    
    return (
        <SuccessContainer>
            <p>Pedido feito com sucesso!</p>
            <div data-test="movie-info">
                <h2>Filme e sessão</h2>
                <p>{successObject.sessionData.movie.title}</p>
                <p>{successObject.sessionData.day.date} {successObject.sessionData.name}</p>
            </div>
            <div data-test="seats-info">
                <h2>Ingressos</h2>
                {successObject.assentos.map(elm => <p key={elm}>Assento {elm}</p>)}
            </div>
            <div data-test="client-info">
                <h2>Comprador</h2>
                <p>Nome: {successObject.name}</p>
                <p>CPF: {successObject.cpf}</p>
            </div>
            <Link data-test="go-home-btn" to="/">
                <button>Voltar pra Home</button>
            </Link>
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