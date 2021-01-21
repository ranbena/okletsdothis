import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: string;
      link: string;
      light: string;
      bg: string;
      error: string;
    };
  }
}
