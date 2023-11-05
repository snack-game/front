import { useState } from 'react';

import { useTheme } from '@emotion/react';

import GoldenAppleImage from '@assets/images/golden_apple.png';
import RefreshImage from '@assets/images/refresh.png';
import AppleGameTutorialImage from '@assets/images/tutorial/game.png';
import GreetingImage from '@assets/images/tutorial/greeting.png';
import GuestImage from '@assets/images/tutorial/guest.png';
import Button from '@components/common/Button/Button';
import * as Styled from '@components/ui/Tutorial/AppleGameTutorial.style';

import useLocalStorage from '@hooks/useLocalStorage';
import useModal from '@hooks/useModal';

const AppleGameTutorial = () => {
  const theme = useTheme();
  const [tutorialStep, setTutorialStep] = useState<number>(0);

  const { closeModal } = useModal();
  const { setStorageValue } = useLocalStorage({
    key: 'tutorial',
  });

  const handleClose = () => {
    setStorageValue(false);
    closeModal();
  };

  const handlePrev = () => {
    setTutorialStep((preStep) => preStep - 1);
  };

  const handleNext = () => {
    setTutorialStep((preStep) => preStep + 1);
  };

  return (
    <Styled.AppleGameTutorialContainer>
      <Styled.Title>튜토리얼!</Styled.Title>
      <Styled.ImageContainer>
        {tutorialStep === 0 && <img src={GreetingImage} alt={'환영 이미지'} />}
        {tutorialStep === 1 && (
          <img src={GuestImage} alt={'게스트 로그인 이미지'} />
        )}
        {tutorialStep === 2 && (
          <img src={AppleGameTutorialImage} alt={'게임 튜토리얼 이미지'} />
        )}
        {tutorialStep === 3 && (
          <img src={GoldenAppleImage} alt={'황금사과 이미지'} />
        )}
        {tutorialStep === 4 && (
          <img src={RefreshImage} alt={'새로고침 이미지'} />
        )}
        {tutorialStep === 5 && <img src={GreetingImage} alt={'환영 이미지'} />}
      </Styled.ImageContainer>
      <Styled.Description>
        {tutorialStep === 0 &&
          'Snack Game에 오신 것을 환영합니다!\n게임에 관해 설명드릴게요!'}
        {tutorialStep === 1 &&
          '시작 버튼을 통해 게임을 시작하세요!\n로그인이 안되어 있다면 게스트로 자동 로그인 됩니다! '}
        {tutorialStep === 2 &&
          '드래그로 사과들의 숫자합을 10으로 만드세요!\n사과의 개수는 상관없어요!\n게임 시간은 총 2분 입니다!'}
        {tutorialStep === 3 &&
          '황금사과는 게임판을 새로 갈아줘요!\n전략적으로 사용해서 고득점을 노려봐요!'}
        {tutorialStep === 4 && '게임이 잘 안풀리면 새게임을 시작할 수 있어요!'}
        {tutorialStep === 5 &&
          '튜토리얼이 끝났습니다!\n랭킹경쟁에 참여하고 고득점을 노려보아요!\n즐거운 게임 되세요!'}
      </Styled.Description>

      {tutorialStep !== 5 && (
        <Styled.TutorialNav>
          {tutorialStep == 0 ? (
            <Button
              content={'건너뛰기'}
              onClick={handleClose}
              color={theme.colors.boxBorder}
            />
          ) : (
            <Button
              content={'이전'}
              color={theme.colors.boxBorder}
              onClick={handlePrev}
            />
          )}
          <Button content={'다음'} onClick={handleNext} />
        </Styled.TutorialNav>
      )}
      {tutorialStep === 5 && <Button content={'닫기'} onClick={handleClose} />}
    </Styled.AppleGameTutorialContainer>
  );
};

export default AppleGameTutorial;
