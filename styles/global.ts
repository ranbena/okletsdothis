import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
      font-family: 'Carter One';
      src: url('/fonts/CarterOne.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
      font-display: swap;
  }

  body {
    color: #05396b;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #05396b;
  }

  a {
    color: #389583;
    transition: none;

    &:active,
    &:hover {
      color: #05396b;
    }
  }
`;
