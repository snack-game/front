import React, { FC } from 'react';

import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { darken, transparentize } from 'polished';

interface ButtonProps {
  className?: string;
  content: string;
  onClick?: () => void;
  wrapper?: SerializedStyles;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

interface StyledButtonProps {
  show?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: 'black' | 'white';
}

const Button: FC<ButtonProps & StyledButtonProps> = ({
  content,
  onClick,
  wrapper,
  type = 'button',
  disabled,
  size = 'medium',
  show = true,
  color = '#fb923c',
  text = 'white',
}) => {
  return (
    <StyledWrapper css={wrapper}>
      <StyledButton
        onClick={onClick}
        type={type}
        disabled={disabled}
        show={show}
        size={size}
        text={text}
        color={color}
      >
        {content}
      </StyledButton>
    </StyledWrapper>
  );
};

export default Button;

const StyledButton = styled.button<StyledButtonProps>`
  padding: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.25rem 0.75rem';
      case 'large':
        return '0.75rem 2.25rem';
      default: // medium
        return '0.5rem 1.5rem';
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.875rem';
      case 'large':
        return '1.25rem';
      default: // medium
        return '1.125rem';
    }
  }};
  line-height: 1.75rem;
  border-radius: 0.25rem;
  border-width: 0;
  display: ${(props) => (props.show ? 'inline-flex' : 'none')};
  color: ${(props) => (props.text == 'white' ? '#ffffff' : '#505050')};
  background-color: ${(props) => props.color || '#fb923c'};

  &:hover {
    background-color: ${(props) =>
      props.color ? darken(0.1, props.color) : '#f97316'};
  }

  &:disabled {
    background-color: ${(props) =>
      props.color
        ? transparentize(0.5, props.color)
        : 'rgba(249, 115, 22, 0.5)'};
  }
`;

const StyledWrapper = styled.div`
  width: fit-content;
  margin: auto;
`;
