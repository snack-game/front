import { ChangeEvent, FC } from 'react';

import styled from '@emotion/styled';

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  valid?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({
  placeholder,
  onChange,
  type = 'text',
  valid,
  errorMessage,
  required,
}) => {
  return (
    <StyledInputWrapper>
      <StyledLabel>{placeholder}</StyledLabel>
      <StyledInput type={type} onChange={onChange} required={required} />
      {valid && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </StyledInputWrapper>
  );
};

export default Input;

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
  color: #374151;
  font-size: 1rem;
  line-height: 2rem;
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  outline: 0;

  &:focus {
    border-color: #fb923c;
  }
`;

const StyledErrorMessage = styled.div``;
