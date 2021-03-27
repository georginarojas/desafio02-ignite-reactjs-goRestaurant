import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --red: #c72828;
    --green: #39b100;
    --green-light: #41c900;
    --text: #3d3d4d;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
