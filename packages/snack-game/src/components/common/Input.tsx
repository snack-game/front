import { FC } from 'react';

import styled from '@emotion/styled';

interface InputProps {
  children?: never;
  type?: string;
  placeholder?: string;
}

const StyledInputWrapper = styled.div`
  margin-right: 1rem;
  width: 100%;

  @media (min-width: 1280px) {
    width: 50%;
  }
`;

const StyledLabel = styled.label`
  color: #4b5563;
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const StyledInput = styled.input`
  padding: 0.25rem 0.75rem;
  background-color: #f3f4f6;
  --bg-opacity: 0.5;
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  color: #374151;
  font-size: 1rem;
  line-height: 2rem;
  width: 100%;
  border-radius: 0.25rem;
  border-width: 1px;
  border-color: #d1d5db;
  outline: 0;
`;

const Input: FC<InputProps> = ({ placeholder }) => {
  return (
    <StyledInputWrapper>
      <StyledLabel>
        {placeholder}
        <StyledInput type="text" />
      </StyledLabel>
    </StyledInputWrapper>
  );
};

export default Input;
