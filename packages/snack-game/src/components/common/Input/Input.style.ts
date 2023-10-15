import styled from '@emotion/styled';

export const InputContainer = styled.div`
  margin-right: 1rem;
  width: 100%;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.colors.description};
  font-size: 1.125rem;
  line-height: 1.75rem;
`;

export const Input = styled.input<{ valid?: boolean }>`
  padding: 0.25rem 0.75rem;
  background-color: ${(props) => props.theme.colors.background};
  --bg-opacity: 0.5;
  color: ${(props) => props.theme.colors.description};
  font-size: 1rem;
  line-height: 2rem;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.boxBorder};
  border-radius: 0.25rem;
  outline: 0;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:focus {
    border-color: ${(props) =>
      props.valid
        ? props.theme.colors.lightGreen
        : props.theme.colors.errorColor};
  }
`;

export const ErrorMessage = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${(props) => props.theme.colors.description};
`;
