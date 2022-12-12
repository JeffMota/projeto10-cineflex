import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import FooterSession from "./FooterSession"
import Success from "./Success"

export default function SeatSelect() {
    const [sessionData, setSessionData] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [selectedNames, setSelectedNames] = useState([])
    const [anterior, setAnterior] = useState([])
    const [sucesso, setSucesso] = useState(false)
    
    const [CPF, setCPF] = useState([])
    const [Name, setName] = useState([])


    const [loaded, setLoaded] = useState(false)

    const { idSessao } = useParams()


    function select(seat) {
        if(seat.isAvailable === false){
            alert("Esse assento não está disponível")
            return
        }

        let aux = [...selectedIds, seat.id]
        if (selectedIds.includes(seat.id)) {
            aux = aux.filter(elm => elm !== seat.id)
        }
        setSelectedIds(aux)
        aux = [...selectedNames, seat.name]
        if (selectedNames.includes(seat.name)) {
            aux = aux.filter(elm => elm !== seat.name)
        }
        setSelectedNames(aux)
    }

    useEffect(() => {

        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promise.then(res => {
            setSessionData(res.data)
            setLoaded(true)
        })
        promise.catch(err => console.log(err))

    }, [])

    function mask(cpf){
        let aux = cpf
        if(aux.length === 3 && aux.length > anterior){
            aux += '.'
        }
        if(aux.length === 7 && aux.length > anterior){
            aux += '.'
        }
        if(aux.length === 11 && aux.length > anterior){
            aux += '-'
        }
        
        setCPF(aux)
        setAnterior(aux.length)
    }

    function sendRequest(e){
        e.preventDefault()

        if(selectedIds.length == 0){
            alert('Selecione pelo menos um assento')
            return
        }

        const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many'
        const body = {
            ids: selectedIds,
            name: Name,
            cpf: CPF
        }

        const promise = axios.post(URL, body)
        promise.then(res => {
            setSucesso(true)
        })
        promise.catch(err => console.log(err))
    }

    function finish(){
        setSessionData([])
        setSelectedIds([])
        setSelectedNames([])
        setAnterior([])
        setSucesso(false)
    }

    return (
        <>
        {!sucesso ? 
        <SeatContainer>
            <p>Selecione o(s) assento(s)</p>

            {(loaded) &&
                <SeatList>
                    {sessionData.seats.map(seat =>
                        <Seat
                            data-test="seat"
                            onClick={() => select(seat)}
                            key={seat.id}
                            // disabled={seat.isAvailable ? false : true}
                            available={(selectedIds.includes(seat.id)) ? 'selected' : seat.isAvailable}>
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

            <Description>
                <div>
                    <Seat available={'selected'}></Seat>
                    <p>Selecionado</p>
                </div>
                <div>
                    <Seat available={true}></Seat>
                    <p>Disponível</p>
                </div>
                <div>
                    <Seat available={false}></Seat>
                    <p>Indisponível</p>
                </div>
            </Description>

            <Form onSubmit={e => sendRequest(e)}>
                <label>
                    Nome do comprador:
                    <input
                        data-test="client-name"
                        required
                        type="text" 
                        placeholder="Digite o seu nome..." 
                        onChange={e => setName(e.target.value)}
                        value={Name}
                    />    
                </label>
                <label>
                    CPF do comprador:
                    <input
                        data-test="client-cpf"
                        required
                        autoComplete="off" 
                        maxLength="14" 
                        type="text" 
                        placeholder="Digite o CPF..." 
                        onChange={e => mask(e.target.value)}
                        value={CPF}
                    />
                </label>

                <button data-test="book-seat-btn" type="submit">Reservar assento(s)</button>
            </Form>
        </SeatContainer> :
        <Success>
            <p>Pedido feito com sucesso!</p>
            <div data-test="movie-info">
                <h2>Filme e sessão</h2>
                <p>{sessionData.movie.title}</p>
                <p>{sessionData.day.date} {sessionData.name}</p>
            </div>
            <div data-test="seats-info">
                <h2>Ingressos</h2>
                {selectedNames.map(elm => <p key={elm}>Assento {elm}</p>)}
            </div>
            <div data-test="client-info">
                <h2>Comprador</h2>
                <p>Nome: {Name}</p>
                <p>CPF: {CPF}</p>
            </div>
            <Link data-test="go-home-btn" to="/">
                <button onClick={finish}>Voltar pra Home</button>
            </Link>
        </Success>
        }
        </>
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
    background-color: ${props => (props.available) ? (props.available == true ? '#C3CFD9' : '#1AAE9E') : '#FBE192'};

    font-size: 11px;
    font-family: 'Roboto', sans-serif;
`
const Description = styled.div`
    display: flex;

    margin-top: 20px;
    justify-content: space-between;

    width: 75%;

    > div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 13px;
        color: #4E5A65;
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 85%;

    color: #293845;

    > label{
        display:flex;
        flex-direction: column;

        margin-top: 15px;

        justify-content: space-between;
        
        font-size: 18px;
        height: 80px;
        width: 100%;
        
        > input{
            height: 51px;
            font-size: 18px;
            padding: 0 10px;

            font-family: 'Roboto', sans-serif;
        }
    }

    > button{
        margin-top: 50px;

        width: 225px;
        height: 42px;

        background-color: #E8833A;
        border: none;
        border-radius: 3px;

        color: #ffff;
        font-size: 18px;
    }
`