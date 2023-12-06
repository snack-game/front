import styled from '@emotion/styled';

export const AuthTypeContainer = styled.div`
  width: fit-content;
  margin: 1rem auto 0 auto;
`;

export const Form = styled.form`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  width: 100%;
  min-width: 310px;
  min-height: 400px;
`;

export const Title = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.titleText};
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
  color: ${(props) => props.theme.colors.description};
`;

export const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.description};

  & > p {
    font-size: 1.2rem;
  }

  & > span {
    font-size: 1rem;
  }
`;

export const SocialLoginImgContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;

  & > a > img {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
  }
`;
