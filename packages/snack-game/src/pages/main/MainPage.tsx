import { Helmet } from 'react-helmet-async';

import AppleGameLottie from '@assets/lottie/apple-game.json';
import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button/Button';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';
import TeamInfo from '@components/ui/TeamInfo/TeamInfo';
import { LottieOptionTypes } from '@utils/types/common.type';

import PATH from '@constants/path.constant';
import { useInternalRouter } from '@hooks/useInternalRouter';
import useLottie from '@hooks/useLottie';

import * as Styled from './MainPage.style';

const lottieOptions: LottieOptionTypes = {
  animationData: AppleGameLottie,
  autoplay: true,
  loop: true,
};

const MainPage = () => {
  const { ref } = useLottie(lottieOptions);
  const { push } = useInternalRouter();

  const handleAppleGameEnter = () => {
    window.scrollTo(0, 0);
    push(PATH.APPLE_GAME);
  };

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
            <div className="flex justify-center">
              <Button content={'입장'} onClick={handleAppleGameEnter}></Button>
            </div>
          </Styled.AppleGamePageRight>
        </Styled.AppleGamePageContainer>
        <TeamInfo />
      </PageContainer>
    </>
  );
};

export default MainPage;
