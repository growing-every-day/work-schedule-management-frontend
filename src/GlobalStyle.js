import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: inherit;
}
html {
font-family: "Roboto","Arial",sans-serif;
}
.centerAlign {
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

export default GlobalStyle;
