import styled from '@emotion/styled';
import { darken } from 'polished';

import theme from '@utils/theme';

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
  border: 1px solid ${theme.colors.boxBorder};
  padding: 0.2rem;
  right: 0;
  z-index: 30;
  background-color: ${theme.colors.gray};
  animation: growOut 300ms ease-in-out forwards;
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
  font-size: 16px;
  opacity: 1;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    background-color: ${darken(0.1, theme.colors.gray)};
  }

  & > div {
    width: 100%;
  }
`;
