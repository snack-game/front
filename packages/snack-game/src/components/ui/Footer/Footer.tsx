import * as Styled from '@components/ui/Footer/Footer.style';

const Footer = () => {
  return (
    <Styled.FooterContainer>
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
    </Styled.FooterContainer>
  );
};

export default Footer;
