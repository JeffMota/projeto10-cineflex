import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import FooterSession from "./FooterSession"

export default function SessionSelect() {
    const { idFilme } = useParams()
    const [movieData, setMovieData] = useState([])
    const [movieDays, setMovieDays] = useState([])

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
        promise.then(res => {
            setMovieData(res.data)
            setMovieDays(res.data.days)
        })
        promise.catch(err => { console.log(err) })

    }, [])

    return (
        <>
            <SessionContainer>
                <p>Selecione o horário</p>
                <div>
                    {movieDays.map(day =>
                        <DayContainer key={day.id}>
                            <p>{day.weekday} - {day.date}</p>
                            <div>
                                {day.showtimes.map(elm =>
                                    <Link to={`/assentos/${elm.id}`} key={elm.id}>
                                        <button>{elm.name}</button>
                                    </Link>
                                )}
                            </div>
                        </DayContainer>
                    )}
                </div>
            </SessionContainer>
            <FooterSession title={movieData.title} poster={movieData.posterURL} day={false}/>
        </>
    )
}

const SessionContainer = styled.div`
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

    > div{
        display: flex;
        flex-direction: column;
        width: 90%;

    }
`

const DayContainer = styled.div`
    
    > p {
        font-size: 20px;
        color: #293845;
    }
`