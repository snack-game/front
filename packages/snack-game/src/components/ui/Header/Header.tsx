import { Link } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import LogoImage from '@assets/images/logo.png';
import * as Styled from '@components/ui/Header/Header.style';
import { userState } from '@utils/atoms/auth';

import PATH from '@constants/path.constant';
import Button from '@components/common/Button';

const Header = () => {
  const userInfo = useRecoilValue(userState);

  return (
    <Styled.HeaderWrapper>
      <Styled.Title href={PATH.HOME}>
        <img src={LogoImage} alt={'로고 이미지'} />
        <span>Snack Game</span>
      </Styled.Title>
      <Styled.Nav>
        <Link to={PATH.BOARD}>
          <Button content={'리더보드'} size={'small'} />
        </Link>
        {userInfo.accessToken ? (
          <>{userInfo.name} 님</>
        ) : (
          <>
            <Link to={PATH.LOGIN}>
              <Button
                content={'로그인'}
                size={'small'}
                color={'#656565'}
                text={'white'}
              />
            </Link>
            <Link to={PATH.REGISTER}>
              <Button
                content={'회원가입'}
                size={'small'}
                color={'#dedddd'}
                text={'black'}
              />
            </Link>
          </>
        )}
      </Styled.Nav>
    </Styled.HeaderWrapper>
  );
};

export default Header;
