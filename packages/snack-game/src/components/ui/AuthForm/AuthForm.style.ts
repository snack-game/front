import styled from '@emotion/styled';

export const Form = styled.form`
  display: flex;
  padding: 2rem;
  margin-top: 2.5rem;
  flex-direction: column;
  border-radius: 0.5rem;
  width: 100%;
  background-color: white;
  border: 1px solid #d1d5db;

  @media (min-width: 768px) {
    margin-top: 0;
    width: 50%;
  }
  @media (min-width: 1024px) {
    width: 33.333333%;
  }
`;

export const Title = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: #111827;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #6b7280;
`;
