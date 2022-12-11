import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import FooterSession from "./FooterSession"

export default function SeatSelect() {
    const [sessionData, setSessionData] = useState([])

    const [loaded, setLoaded] = useState(false)

    const { idSessao } = useParams()

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promise.then(res => {
            setSessionData(res.data)
            setLoaded(true)
        })
        promise.catch(err => console.log(err))

    }, [])

    return (
        <SeatContainer>
            <p>Selecione o(s) assento(s)</p>

            {(loaded) &&
                <SeatList>
                    {sessionData.seats.map(seat =>
                        <Seat 
                            key={seat.id} 
                            disabled={seat.isAvailable ? false : true} 
                            available={seat.isAvailable}>
                                    {(seat.name.length == 1) ? '0' + seat.name : seat.name}
                        </Seat>
                    )}

                </SeatList>
            }

            {(loaded) &&
                <FooterSession
                    title={sessionData.movie.title}
                    poster={sessionData.movie.posterURL}
                    day={`${sessionData.day.weekday} - ${sessionData.day.date}`}
                />
            }

            <div>
                <Seat available={'selected'}></Seat>
                <Seat available={true}></Seat>
                <Seat available={false}></Seat>
            </div>
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

const SeatList = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);

    gap: 15px 7px;

    width: 85%;
    
`

const Seat = styled.button`
    width: 26px;
    height: 26px;

    color: black;

    border: 1px solid ${props => (props.available) ? (props.available == true ? '#808F9D' : '#0E7D71') : '#F7C52B'};
    border-radius: 50%;
    background-color: ${props => (props.available) ? (props.available == true ? '#C3CFD9' : '#1AAE9E')  : '#FBE192'};

    font-size: 11px;
    font-family: 'Roboto', sans-serif;
`