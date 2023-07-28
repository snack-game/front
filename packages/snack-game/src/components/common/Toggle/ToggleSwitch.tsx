import React, { FC } from 'react';

import * as Styled from './ToggleSwitch.style';

interface ToggleSwitchProps {
  toggle: boolean;
  left: string;
  right: string;
  onClick: () => void;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  toggle,
  left,
  right,
  onClick,
}) => {
  return (
    <Styled.ToggleContainer onClick={onClick}>
      <Styled.ToggleLeft toggle={toggle}>{left}</Styled.ToggleLeft>
      <Styled.ToggleRight toggle={toggle}>{right}</Styled.ToggleRight>
      <Styled.Highlight toggle={toggle} />
    </Styled.ToggleContainer>
  );
};

export default ToggleSwitch;
