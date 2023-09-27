import styled from '@emotion/styled';

import theme from '@utils/theme';

interface StyledToggleSwitchProps {
  toggle: boolean;
}

export const ToggleContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
`;

export const Highlight = styled.div<StyledToggleSwitchProps>`
  height: 100%;
  width: 50%;
  border-radius: 15px;
  background-color: ${theme.colors.orange};
  position: absolute;
  top: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.toggle ? 'translateX(95px)' : 'translateX(0px)'};
`;

export const ToggleLeft = styled.div<StyledToggleSwitchProps>`
  flex-grow: 1;
  text-align: center;
  z-index: 1;
  transition: ease-in-out 0.3s;
  color: ${(props) =>
    props.toggle ? theme.colors.titleText : theme.colors.background};
`;

export const ToggleRight = styled.div<StyledToggleSwitchProps>`
  flex-grow: 1;
  text-align: center;
  z-index: 1;
  transition: ease-in-out 0.3s;
  color: ${(props) =>
    props.toggle ? theme.colors.background : theme.colors.titleText};
`;
