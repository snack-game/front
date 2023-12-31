import { useTranslation } from 'react-i18next';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import Button from '@components/common/Button/Button';
import * as Styled from '@components/ui/AuthForm/Auth.style';
import OAuthContainer from '@components/ui/AuthForm/OAuthContainer';
import { userState } from '@utils/atoms/member.atom';

import { useIntegrateMember } from '@hooks/queries/members.query';
import useModal from '@hooks/useModal';

interface GameResultProps {
  score: number;
  reStart: () => void;
}

const GameResult = ({ score, reStart }: GameResultProps) => {
  const { t } = useTranslation();
  const userStateValue = useRecoilValue(userState);
  const integrateMember = useIntegrateMember();
  const { closeModal } = useModal();

  const handleReStartButton = () => {
    reStart();
    closeModal();
  };

  const onOAuthSuccess = async () => {
    return await integrateMember.mutateAsync();
  };

  return (
    <GameResultContainer>
      <div css={css({ display: 'flex', gap: '1rem', flexDirection: 'column' })}>
        <p>
          {t('game_result')}: {score}
          {t('game_score')}!
        </p>
        <Button content={t('game_restart')} onClick={handleReStartButton} />
      </div>
      {userStateValue.member.type === 'GUEST' && (
        <Styled.SocialLoginContainer>
          <p>나는 몇 등일까?</p>
          <RankingContainer>
            ??? {t('rank')}
            <p>
              {score} {t('game_score')}
            </p>
          </RankingContainer>
          <OAuthContainer oAuthOnSuccess={onOAuthSuccess} />
          <span>{t('login_integrate')}</span>
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
  border: 1px solid ${(props) => props.theme.colors.orange};
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
