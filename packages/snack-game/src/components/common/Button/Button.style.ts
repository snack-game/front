import styled from '@emotion/styled';
import { darken, transparentize } from 'polished';

import theme from '@utils/theme';

export interface StyledButtonProps {
  show?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: 'black' | 'white';
  border?: boolean;
}

export const Button = styled.button<StyledButtonProps>`
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

  display: ${(props) => (props.show ? 'inline-flex' : 'none')};
  color: ${(props) =>
    props.text == 'white' ? theme.colors.background : theme.colors.description};
  background-color: ${(props) => props.color || theme.colors.primaryButton};
  border: ${(props) =>
    props.border ? `1px solid ${theme.colors.boxBorder}` : 'none'};

  line-height: 1.75rem;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${(props) =>
      props.color ? darken(0.1, props.color) : theme.colors.primaryButtonHover};
  }

  &:disabled {
    background-color: ${(props) =>
      props.color
        ? transparentize(0.5, props.color)
        : 'rgba(249, 115, 22, 0.5)'};
  }
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  margin: auto;
`;
