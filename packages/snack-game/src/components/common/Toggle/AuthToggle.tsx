import React from 'react';

import * as Styled from './AuthToggle.style';

interface AuthToggleProps {
  toggle: boolean;
  left: string;
  right: string;
  onClick: () => void;
}

const AuthToggle = ({ toggle, left, right, onClick }: AuthToggleProps) => {
  return (
    <Styled.ToggleContainer onClick={onClick}>
      <Styled.ToggleLeft toggle={toggle}>{left}</Styled.ToggleLeft>
      <Styled.ToggleRight toggle={toggle}>{right}</Styled.ToggleRight>
      <Styled.Highlight toggle={toggle} />
    </Styled.ToggleContainer>
  );
};

export default AuthToggle;
