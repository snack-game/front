import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { useTheme } from '@emotion/react';

import AppleGameLottie from '@assets/lottie/apple-game.json';
import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button/Button';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';
import { LottieOptionTypes } from '@utils/types/common.type';

import PATH from '@constants/path.constant';
import useLottie from '@hooks/useLottie';

import * as Styled from './MainPage.style';

const lottieOptions: LottieOptionTypes = {
  animationData: AppleGameLottie,
  autoplay: true,
  loop: true,
};

const MainPage = () => {
  const theme = useTheme();
  const { ref } = useLottie(lottieOptions);

  return (
    <>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <SnackRainContainer />
      <PageContainer>
        <Styled.AppleGamePageContainer>
          <Styled.AppleGamePageLeft>
            <div ref={ref} />
          </Styled.AppleGamePageLeft>
          <Styled.AppleGamePageRight>
            <h1>사과게임</h1>
            <p>
              드래그 영역의 숫자 합이 10이 되도록 사과를 떨궈주세요!
              <br />
              황금사과를 통해 판을 초기화하고 고득점을 노려보아요!
            </p>

            <Styled.AppleGamePageInfo>
              <Link to={PATH.APPLE_GAME}>
                <Button content={'게임 시작'} size={'large'}></Button>
              </Link>
              <Link to={PATH.FEED_BACK}>
                <Button
                  content={'피드벡 보내기'}
                  size={'medium'}
                  color={theme.colors.lightGreen}
                ></Button>
              </Link>
            </Styled.AppleGamePageInfo>
          </Styled.AppleGamePageRight>
        </Styled.AppleGamePageContainer>
      </PageContainer>
    </>
  );
};

export default MainPage;
