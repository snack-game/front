import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import GoogleSingIn from '@assets/images/google.png';
import KaKaoSingIn from '@assets/images/kakao.png';
import Button from '@components/common/Button/Button';
import * as Styled from '@components/ui/AuthForm/Auth.style';
import { userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useModal from '@hooks/useModal';

interface GameResultProps {
  score: number;
  reStart: () => void;
}

const GameResult = ({ score, reStart }: GameResultProps) => {
  const userStateValue = useRecoilValue(userState);
  const { closeModal } = useModal();

  const handleReStartButton = () => {
    reStart();
    closeModal();
  };

  return (
    <GameResultContainer>
      <p>최종 점수: {score}점!</p>
      <Button content={'다시하기'} onClick={handleReStartButton} />
      {userStateValue.guest && (
        <Styled.SocialLoginContainer>
          <p>게임이 마음에 들었나요? 계정 연동하기</p>
          <Styled.SocialLoginImgContainer>
            <Link to={PATH.GOOGLE} referrerPolicy={'origin'}>
              <img src={GoogleSingIn} alt={'구글 로그인'} />
            </Link>
            <Link to={PATH.KAKAO} referrerPolicy={'origin'}>
              <img src={KaKaoSingIn} alt={'카카오 로그인'} />
            </Link>
          </Styled.SocialLoginImgContainer>
        </Styled.SocialLoginContainer>
      )}
    </GameResultContainer>
  );
};

const GameResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.titleText};

  & > p {
    font-size: 1.5rem;
  }
`;

export default GameResult;
