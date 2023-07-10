import { FC } from 'react';

import * as Styled from '@components/ui/Footer/Footer.style';

interface FooterProps {
  children?: never;
}

const Footer: FC<FooterProps> = () => {
  return (
    <Styled.FooterWrapper>
      <Styled.Title>
        <span>SnackGame</span>
      </Styled.Title>
      <Styled.CopyRight>
        © 2023 SnackGame —
        <a rel="noopener noreferrer" target="_blank">
          @dev-dong-su, @0chil
        </a>
      </Styled.CopyRight>
      <Styled.IconProvider>
        <a href="https://www.flaticon.com/kr/free-icons/" title="아이콘">
          아이콘 제작자: Freepik - Flaticon
        </a>
      </Styled.IconProvider>
    </Styled.FooterWrapper>
  );
};

export default Footer;
