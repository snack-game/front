import React, { FC } from 'react';

import { SerializedStyles } from '@emotion/react';

import * as Styled from './Button.style';

interface ButtonProps {
  className?: string;
  content: string;
  onClick?: () => void;
  wrapper?: SerializedStyles;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<ButtonProps & Styled.StyledButtonProps> = ({
  content,
  onClick,
  wrapper,
  type = 'button',
  disabled,
  size = 'medium',
  show = true,
  color,
  text = 'white',
  border = false,
}) => {
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
      </Styled.Button>
    </Styled.ButtonContainer>
  );
};

export default Button;
