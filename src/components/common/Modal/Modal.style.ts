import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: fit-content;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.boxBorder};

  transform: translate(-50%, -50%);

  animation: ${keyframes`
    0% { transform: translate(-50%, -50%) scale(0.5); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
    100% { transform: translate(-50%, -50%) scale(1); }
  `} 0.3s ease-in;

  @media (max-width: 768px) {
    width: 90%;
    padding: 0.5rem;
  }
`;

export const ModalExitButton = styled.div``;
