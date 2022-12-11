import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    body {
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-family: 'Roboto', sans-serif;

    }
`

export default GlobalStyle