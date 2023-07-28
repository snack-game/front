import { ChangeEvent, FC } from 'react';

import * as Styled from './Input.style';

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
    <Styled.InputContainer>
      <Styled.Label htmlFor={id}>{placeholder}</Styled.Label>
      <Styled.Input
        id={id}
        type={type}
        onChange={onChange}
        required={required}
        valid={valid}
        value={value}
        autoComplete={'off'}
      />
      {!valid && valid !== undefined && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}
    </Styled.InputContainer>
  );
};

export default Input;
