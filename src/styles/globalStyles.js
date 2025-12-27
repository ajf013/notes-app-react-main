import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    background-image: ${({ theme }) => theme.backgroundImage};
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    color: ${({ theme }) => theme.text};
    font-family: 'Roboto', sans-serif;
    transition: all .5s linear;
  }
  p {
    line-height: 1.4rem;
  }
  .btn-primary {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.body};
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border-radius: 1rem;
    cursor: pointer;
    outline: none;
    border: none;
    transition: all .5s linear;
  }
  .header h1 {
    background: ${({ theme }) => theme.headerBg};
    padding: 0.5rem 1rem;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

export const lightTheme = {
  body: '#fff',
  text: '#121212',
  primary: '#6200ee',
  headerBg: 'rgba(255, 255, 255, 0.6)',
  backgroundImage: "url('https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", // Light botanical/fresh
};

export const darkTheme = {
  body: '#121212',
  text: '#fff',
  primary: '#bb86fc',
  headerBg: 'rgba(0, 0, 0, 0.5)',
  backgroundImage: "url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')", // Dark starry night
};