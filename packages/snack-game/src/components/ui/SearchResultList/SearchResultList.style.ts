import styled from '@emotion/styled';

export const Ul = styled.ul`
  width: 100%;
  list-style: none;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0 0.5rem 0;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px 0;
`;

export const Li = styled.li`
  width: 95%;
  padding: 1rem 0.5rem 1rem 0.5rem;
  margin: auto;
  border-bottom: 1px solid #d1d5db;
  cursor: pointer;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background-color: #f3f4f6;
  }
`;
