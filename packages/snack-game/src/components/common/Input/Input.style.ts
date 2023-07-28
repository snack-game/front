import styled from '@emotion/styled';

import theme from '@utils/theme';

export const InputContainer = styled.div`
  margin-right: 1rem;
  width: 100%;
`;

export const Label = styled.label`
  color: ${theme.colors.description};
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const Input = styled.input<{ valid?: boolean }>`
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

export const ErrorMessage = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${theme.colors.description};
`;
