import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  colors: {
    primary: '#dbeafe',
    secondary: '#d1e4fe',
    tertiary: '#a1c6fa',
    text: '#1f2937',
    background: '#ffffff',
    muted: '#6b7280',
    accent: '#5a93db'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  space: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

export const darkTheme = {
  colors: {
    primary: '#354a79',
    secondary: '#4b6197',
    tertiary: '#5b72ac',
    text: '#f3f4f6',
    background: '#111827',
    muted: '#9ca3af',
    accent: '#94bae9'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  space: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  }
};

export const theme = {
  colors: lightTheme.colors,
  fonts: lightTheme.fonts,
  fontSizes: lightTheme.fontSizes,
  space: lightTheme.space,
  breakpoints: lightTheme.breakpoints
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
    font-family: ${(props) => props.theme.fonts.body};
    line-height: 1.6;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  a {
    color: ${(props) => props.theme.colors.accent};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.heading};
    line-height: 1.2;
    margin: 2rem 0 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  code {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 3px;
    font-family: ${(props) => props.theme.fonts.monospace};
    padding: 0.2em 0.4em;
  }
`;
