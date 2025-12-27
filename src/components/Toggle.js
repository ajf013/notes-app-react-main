import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: ${({ theme }) => theme === 'light' ? '#333' : '#FFF'};
  color: ${({ theme }) => theme === 'light' ? '#FFF' : '#333'};
  border: 2px solid ${({ theme }) => theme === 'light' ? '#FFF' : '#333'};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  width: 4rem;
  height: 2rem;
  transition: all 0.3s linear;
  outline: none;

  svg {
    height: 1.5rem;
    width: 1.5rem;
    transition: all 0.3s linear;
  }
`;

export const Toggle = ({ theme, toggleTheme }) => {
  return (
    <ToggleContainer theme={theme} onClick={toggleTheme}>
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </ToggleContainer>
  );
};