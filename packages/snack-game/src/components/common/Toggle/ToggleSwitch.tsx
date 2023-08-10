import React from 'react';

import * as Styled from './ToggleSwitch.style';

interface ToggleSwitchProps {
  toggle: boolean;
  left: string;
  right: string;
  onClick: () => void;
}

const ToggleSwitch = ({ toggle, left, right, onClick }: ToggleSwitchProps) => {
  return (
    <Styled.ToggleContainer onClick={onClick}>
      <Styled.ToggleLeft toggle={toggle}>{left}</Styled.ToggleLeft>
      <Styled.ToggleRight toggle={toggle}>{right}</Styled.ToggleRight>
      <Styled.Highlight toggle={toggle} />
    </Styled.ToggleContainer>
  );
};

export default ToggleSwitch;
