import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from 'axios'
import { Link } from "react-router-dom"
import loading from '../assets/img/Double Ring.gif'

export default function MoviesList({setBack}) {
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v8/cineflex/movies"

        const promise = axios.get(url)
        promise.then(res => {setMovieList(res.data)})
        promise.catch(err => {console.log(err)})

        setBack(false)

    }, [])

    if(movieList.length === 0){
        return(
            <LoadingContainer >
                <img src={loading}></img>
            </LoadingContainer>
        )
    }

    return (
        <MoviesContainer>
            <p>Selecione um Filme</p>
            <div>
                {movieList.map(movie => 
                    <Link data-test="movie" to={`/sessoes/${movie.id}`} key={movie.id}>
                        <CardMovie ><img src={movie.posterURL}/> </CardMovie>
                    </Link>
                        )}
            </div>
        </MoviesContainer>
    )
}

const MoviesContainer = styled.div`
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

    > div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        list-style: none;

        gap: 15px 25px;

        max-width: 80%;
    }
`

const CardMovie = styled.div`
    border: 9px solid white;
    max-width: 7rem;
    max-height: 92%;

    border-radius: 3px;

    box-shadow: 0px 2px 5px #bdbdbd;

    background-color: white;

    > img {
        width: 100%;
    }
`

const LoadingContainer = styled.div`
    display: flex;

    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

`