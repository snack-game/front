import styled from '@emotion/styled';
import { darken, transparentize } from 'polished';

import theme from '@utils/theme';

export interface StyledButtonProps {
  show?: boolean;
  size?: 'small' | 'medium' | 'large';
  color: string;
  text?: 'black' | 'white';
  border?: boolean;
}

export const Button = styled.button<StyledButtonProps>`
  background-color: ${(props) => props.color};
  line-height: 1.75rem;
  border-radius: 0.25rem;
  border: none;

  padding: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.25rem 0.75rem';
      case 'large':
        return '0.75rem 2.25rem';
      default:
        return '0.5rem 1.5rem';
    }
  }};

  font-size: ${(props) => {
    switch (props.size) {
      case 'small':
        return '0.875rem';
      case 'large':
        return '1.25rem';
      default:
        return '1.125rem';
    }
  }};

  display: ${(props) => (props.show ? 'inline-flex' : 'none')};
  color: ${(props) =>
    props.text == 'white' ? theme.colors.background : theme.colors.description};

  &:hover {
    background-color: ${(props) => darken(0.1, props.color)};
  }

  &:disabled {
    background-color: ${(props) => transparentize(0.5, props.color)};
  }
`;

export const ButtonContainer = styled.div`
  width: fit-content;
  margin: auto;
`;
