import React from 'react';

import { SerializedStyles } from '@emotion/react';

import theme from '@utils/theme';

import * as Styled from './Button.style';

export interface ButtonProps {
  className?: string;
  content?: string;
  onClick?: () => void;
  wrapper?: SerializedStyles;
  disabled?: boolean;
  show?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: 'black' | 'white';
}

const Button = ({
  content,
  onClick,
  wrapper,
  disabled,
  size = 'medium',
  show = true,
  color = theme.colors.orange,
  text = 'white',
}: ButtonProps) => {
  return (
    <Styled.ButtonContainer css={wrapper}>
      <Styled.Button
        onClick={onClick}
        disabled={disabled}
        show={show}
        size={size}
        text={text}
        color={color}
      >
        {content}
      </Styled.Button>
    </Styled.ButtonContainer>
  );
};

export default Button;
