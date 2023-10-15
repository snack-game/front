import { useState } from 'react';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import Moon from '@assets/images/moon.png';
import Sun from '@assets/images/sun.png';
import { themeState } from '@utils/atoms/common.atom';

const ThemeToggle = () => {
  const [themeStateValue, setThemeState] = useRecoilState(themeState);
  const [theme, setTheme] = useState(true);

  const handleThemeToggle = () => {
    setThemeState(themeStateValue === 'light' ? 'dark' : 'light');
    setTheme(!theme);
  };

  return (
    <ThemeToggleWrapper onClick={handleThemeToggle}>
      <SunIcon src={Sun} alt="sun" toggle={theme} />
      <MoonIcon src={Moon} alt="moon" toggle={theme} />
    </ThemeToggleWrapper>
  );
};

const ThemeToggleWrapper = styled.div`
  position: relative;
  width: 3rem;
  height: 2em;
  margin: auto;
  border-radius: 2rem;
  background-color: ${(props) => props.theme.colors.lightGreen};

  & > img {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 0;
    transition: transform 0.2s ease-in-out;
  }
`;

interface IconProps {
  toggle: boolean;
}

const SunIcon = styled.img<IconProps>`
  opacity: ${(props) => (props.toggle ? 1 : 0)};
  transform: ${(props) =>
    props.toggle ? 'translateX(0rem)' : 'translateX(1rem)'};
`;

const MoonIcon = styled.img<IconProps>`
  opacity: ${(props) => (props.toggle ? 0 : 1)};
  transform: ${(props) =>
    props.toggle ? 'translateX(0rem)' : 'translateX(1rem)'};
`;

export default ThemeToggle;
