import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import FooterSession from "./FooterSession"

export default function SeatSelect(){
    const [sessionData, setSessionData] = useState([])

    const [loaded, setLoaded] = useState(false)

    const {idSessao} = useParams()

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promise.then(res => {
            setSessionData(res.data)
            setLoaded(true)
            console.log(res.data)
        })
        promise.catch(err => console.log(err))

    }, [])

    return(
        <SeatContainer>
            <p>Selecione o(s) assento(s)</p>
            {(loaded) && 
                <FooterSession 
                    title={sessionData.movie.title} 
                    poster={sessionData.movie.posterURL} 
                    day={`${sessionData.day.weekday} - ${sessionData.day.date}`}
                />}
        </SeatContainer>
    )
}

const SeatContainer = styled.div`
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

        width: 100%;
        margin: 50px;

        font-size: 24px;
        color: #293845;
    }
`