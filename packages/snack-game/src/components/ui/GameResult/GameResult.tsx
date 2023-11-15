import { Link } from 'react-router-dom';

import { css } from '@emotion/react';
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
      <div css={css({ display: 'flex', gap: '1rem', flexDirection: 'column' })}>
        <p>최종 점수: {score}점!</p>
        <Button content={'다시하기'} onClick={handleReStartButton} />
      </div>
      {userStateValue.guest && (
        <Styled.SocialLoginContainer>
          <p>나는 몇 등일까?</p>
          <RankingContainer>
            ??? 등 <p>{score} 점</p>
          </RankingContainer>
          <Styled.SocialLoginImgContainer>
            <Link to={PATH.GOOGLE} referrerPolicy={'origin'}>
              <img src={GoogleSingIn} alt={'구글 로그인'} />
            </Link>
            <Link to={PATH.KAKAO} referrerPolicy={'origin'}>
              <img src={KaKaoSingIn} alt={'카카오 로그인'} />
            </Link>
          </Styled.SocialLoginImgContainer>
          <span>계정 연동하기!</span>
        </Styled.SocialLoginContainer>
      )}
    </GameResultContainer>
  );
};

const GameResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 3rem 1rem 3rem;
  color: ${({ theme }) => theme.colors.titleText};
  white-space: pre-line;
  text-align: center;
  font-size: 1.2rem;

  @media (max-width: 900px) {
    flex-direction: row;
    align-items: center;
  }

  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const RankingContainer = styled.div`
  margin: auto;
  bottom: 0.5rem;
  padding: 1rem;
  border: 1px solid;
  border-color: ${(props) => props.theme.colors.orange};
  border-radius: 1rem;
  color: ${(props) => props.theme.colors.titleText};
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  font-size: 1rem;
  display: flex;
  gap: 1.5rem;

  & > p {
    color: ${(props) => props.theme.colors.orange};
  }
`;

export default GameResult;
