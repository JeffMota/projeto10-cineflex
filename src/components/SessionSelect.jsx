import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import FooterSession from "./FooterSession"
import loading from '../assets/img/Double Ring.gif'

export default function SessionSelect({setBack, setId}) {
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
        setBack('/')
        setId(idFilme)

    }, [])

    if(movieDays.length === 0){
        return(
            <LoadingContainer >
                <img src={loading}></img>
            </LoadingContainer>
        )
    }

    return (
        <>
            <SessionContainer>
                <p>Selecione o horário</p>
                <div>
                    {movieDays.map(day =>
                        <DayContainer data-test="movie-day" key={day.id}>
                            <p>{day.weekday} - {day.date}</p>
                            <div>
                                {day.showtimes.map(elm =>
                                    <Link data-test="showtime" to={`/assentos/${elm.id}`} key={elm.id}>
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

    > div{
        display: flex;

        width: 80%;
        > a {
            display: flex;
            width: 83px;
            height: 43px;

            margin-right: 20px;

            text-decoration: none;

            > button{
                width: 100%;
                height: 100%;

                background-color: #E8833A;

                color: white;

                border: none;
                border-radius: 5px;

                font-size: 16px;
            }
        }
    }
`

const LoadingContainer = styled.div`
    display: flex;

    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

`