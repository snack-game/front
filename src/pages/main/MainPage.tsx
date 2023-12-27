import React from 'react';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';

import {useTheme} from '@emotion/react';

import AppleGameLottie from '@assets/lottie/apple-game.json';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';
import {LottieOptionTypes} from '@utils/types/common.type';

import useLottie from '@hooks/useLottie';

const lottieOptions: LottieOptionTypes = {
  animationData: AppleGameLottie,
  autoplay: true,
  loop: true,
};

const MainPage = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { ref } = useLottie(lottieOptions);

  return (
    <>
        <div className={'bg-amber-400 p-10'}>
          asdasdas
        </div>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <SnackRainContainer />
      {/*<PageContainer>*/}
        {/*<Styled.AppleGamePageContainer>*/}
        {/*  <Styled.AppleGamePageLeft>*/}
        {/*    <div ref={ref} />*/}
        {/*  </Styled.AppleGamePageLeft>*/}
        {/*  <Styled.AppleGamePageRight>*/}
        {/*    <h1>{t('main_title')}</h1>*/}
        {/*    <p>{t('main_desc')}</p>*/}
        {/*    <Styled.AppleGamePageInfo>*/}
        {/*      <Link to={PATH.APPLE_GAME}>*/}
        {/*        <Button content={t('main_start')} size={'large'}></Button>*/}
        {/*      </Link>*/}
        {/*      <Link to={PATH.FEED_BACK} target="_blank">*/}
        {/*        <Button*/}
        {/*          content={t('main_feedback')}*/}
        {/*          size={'medium'}*/}
        {/*          color={theme.colors.lightGreen}*/}
        {/*        ></Button>*/}
        {/*      </Link>*/}
        {/*    </Styled.AppleGamePageInfo>*/}
        {/*  </Styled.AppleGamePageRight>*/}
        {/*</Styled.AppleGamePageContainer>*/}
      {/*</PageContainer>*/}
    </>
  );
};

export default MainPage;
