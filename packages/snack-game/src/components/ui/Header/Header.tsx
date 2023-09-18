import { useRecoilValue } from 'recoil';

import LogoImage from '@assets/images/logo.png';
import Menu from '@components/common/Menu/Menu';
import * as Styled from '@components/ui/Header/Header.style';
import { userState } from '@utils/atoms/auth.atom';

import PATH from '@constants/path.constant';

const Header = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <Styled.HeaderContainer>
      <Styled.Title href={PATH.HOME}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      <Styled.Nav>
        {userInfo.accessToken && <p>{userInfo.name} 님</p>}
        <Menu />
      </Styled.Nav>
    </Styled.HeaderContainer>
  );
};

export default Header;
