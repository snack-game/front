import React from 'react';

import { SerializedStyles } from '@emotion/react';

import * as Styled from './Button.style';

interface ButtonProps {
  className?: string;
  content?: string;
  onClick?: () => void;
  wrapper?: SerializedStyles;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = ({
  content,
  onClick,
  wrapper,
  type = 'button',
  disabled,
  size = 'medium',
  show = true,
  color,
  text = 'white',
  children,
  border = false,
}: ButtonProps & Styled.StyledButtonProps) => {
  return (
    <Styled.ButtonContainer css={wrapper}>
      <Styled.Button
        onClick={onClick}
        type={type}
        disabled={disabled}
        show={show}
        size={size}
        text={text}
        color={color}
        border={border}
      >
        {content}
        {children}
      </Styled.Button>
    </Styled.ButtonContainer>
  );
};

export default Button;
