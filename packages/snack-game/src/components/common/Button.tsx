import React, { FC } from 'react';

import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

interface ButtonProps {
  children?: never;
  className?: string;
  content: string;
  onClick?: () => void;
  show?: boolean;
  wrapper?: SerializedStyles;
}

interface StyledButtonProps {
  show?: boolean;
}

const Button: FC<ButtonProps> = ({
  show = true,
  content,
  onClick,
  wrapper,
}) => {
  return (
    <StyledWrapper css={wrapper}>
      <StyledButton onClick={onClick} show={show}>
        {content}
      </StyledButton>
    </StyledWrapper>
  );
};

export default Button;

const StyledButton = styled.button<StyledButtonProps>`
  padding: 0.5rem 1.5rem;
  color: #ffffff;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-radius: 0.25rem;
  border-width: 0;
  background-color: #fb923c;
  display: ${(props) => (props.show ? 'inline-flex' : 'none')};

  &:hover {
    background-color: #f97316;
  }
`;

const StyledWrapper = styled.div`
  width: fit-content;
`;
