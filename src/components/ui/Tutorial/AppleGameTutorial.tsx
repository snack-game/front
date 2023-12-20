import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
      <Styled.Title>{t('tutorial_title')}</Styled.Title>
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
        {tutorialStep === 0 && t('tutorial_1')}
        {tutorialStep === 1 && t('tutorial_2')}
        {tutorialStep === 2 && t('tutorial_3')}
        {tutorialStep === 3 && t('tutorial_4')}
        {tutorialStep === 4 && t('tutorial_5')}
        {tutorialStep === 5 && t('tutorial_6')}
      </Styled.Description>

      {tutorialStep !== 5 && (
        <Styled.TutorialNav>
          {tutorialStep == 0 ? (
            <Button
              content={t('tutorial_skip')}
              onClick={handleClose}
              color={theme.colors.boxBorder}
            />
          ) : (
            <Button
              content={t('tutorial_prev')}
              color={theme.colors.boxBorder}
              onClick={handlePrev}
            />
          )}
          <Button content={t('tutorial_close')} onClick={handleNext} />
        </Styled.TutorialNav>
      )}
      {tutorialStep === 5 && (
        <Button content={t('tutorial_close')} onClick={handleClose} />
      )}
    </Styled.AppleGameTutorialContainer>
  );
};

export default AppleGameTutorial;
