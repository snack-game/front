import styled from '@emotion/styled';
import { darken } from 'polished';

export const SideBarContainer = styled.div`
  position: relative;

  &:hover > ul {
    display: block;
  }
`;

export const DropDownContainer = styled.ul`
  display: none;
  position: absolute;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.colors.boxBorder};
  padding: 0.2rem;
  right: 0;
  z-index: 30;
  background-color: ${(props) => props.theme.colors.gray};
  animation: growOut 200ms ease-in-out forwards;
  transform-origin: top center;

  @-moz-keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @-webkit-keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @-o-keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const DropDownItem = styled.li`
  list-style: none;
  padding: 10px 20px;
  color: black;
  width: 10rem;
  font-size: 12px;
  opacity: 1;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    background-color: ${(props) => darken(0.1, props.theme.colors.gray)};
  }

  & > div {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
