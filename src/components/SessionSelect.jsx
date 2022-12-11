import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

export default function SessionSelect() {
    const { idFilme } = useParams()
    const [movieData, setMovieData] = useState([])
    const [movieDays, setMovieDays] = useState([])

    let times

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
        promise.then(res => {
            setMovieData(res.data)
            setMovieDays(res.data.days)
            console.log(res.data.days)
        })
        promise.catch(err => { console.log(err) })

    }, [])

    return (
        <SessionContainer>
            <p>Selecione o horário</p>
            <div>
                {movieDays.map(day => 
                    <div key={day.id}>
                        <p>{day.weekday} - {day.date}</p>
                        <div>
                            {day.showtimes.map(elm => <button>{elm.name}</button>)}
                        </div>
                    </div>
                )}
            </div>
        </SessionContainer>
    )
}

const SessionContainer = styled.div`
    margin-top: 67px;

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

        background-color: aqua;
    }

`