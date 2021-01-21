import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: 'Carter One';
    src: url('/fonts/CarterOne-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
    
  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Regular.woff2') format('woff2');
    font-style: normal;
    font-weight: 400;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Light.woff') format('woff');
    font-style: normal;
    font-weight: 300;
    font-display: swap;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    color: ${({ theme }) => theme.colors.text};
    font-family: Roboto Slab;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.link};
    transition: none;

    &:active,
    &:hover {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;
