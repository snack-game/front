import styled from '@emotion/styled';

import theme from '@utils/theme';

export const Form = styled.form`
  display: flex;
  padding: 2rem;
  margin-top: 2.5rem;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${theme.colors.titleText};
`;

export const InputContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  white-space: pre-line;
  color: ${theme.colors.description};
`;

export const AuthTypeContainer = styled.div`
  width: fit-content;
  margin: 1rem auto 0 auto;
`;