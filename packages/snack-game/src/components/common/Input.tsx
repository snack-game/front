import { ChangeEvent, FC } from 'react';

import styled from '@emotion/styled';

import theme from '@utils/theme';

interface InputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  valid?: boolean;
  errorMessage?: string;
  required?: boolean;
  id?: string;
  value?: string;
}

interface StyledInputProps {
  valid?: boolean;
}

const Input: FC<InputProps> = ({
  placeholder,
  onChange,
  type = 'text',
  valid,
  errorMessage,
  required,
  id,
  value,
}) => {
  return (
    <StyledInputWrapper>
      <StyledLabel htmlFor={id}>{placeholder}</StyledLabel>
      <StyledInput
        id={id}
        type={type}
        onChange={onChange}
        required={required}
        valid={valid}
        value={value}
        autoComplete={'off'}
      />
      {!valid && valid !== undefined && (
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
      )}
    </StyledInputWrapper>
  );
};

export default Input;

const StyledInputWrapper = styled.div`
  margin-right: 1rem;
  width: 100%;
`;

const StyledLabel = styled.label`
  color: ${theme.colors.description};
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

const StyledInput = styled.input<StyledInputProps>`
  padding: 0.25rem 0.75rem;
  background-color: ${theme.colors.background};
  --bg-opacity: 0.5;
  color: ${theme.colors.description};
  font-size: 1rem;
  line-height: 2rem;
  width: 100%;
  border: 1px solid ${theme.colors.boxBorder};
  border-radius: 0.25rem;
  outline: 0;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${(props) =>
      props.valid ? theme.colors.lightGreen : theme.colors.errorColor};
  }
`;

const StyledErrorMessage = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${theme.colors.description};
`;
