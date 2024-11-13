import styled from 'styled-components';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Button = styled.button`
  align-items: center;
  background: transparent;
  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  transition: all 0.2s ease;
  width: 40px;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.primary};
  }
`;

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
};
