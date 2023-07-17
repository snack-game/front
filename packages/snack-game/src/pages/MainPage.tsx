import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import AppleGameImage from '@assets/images/apple-game.jpg';
import AppleImage from '@assets/images/apple.png';
import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';
import TeamInfo from '@components/ui/TeamInfo/TeamInfo';
import ThumbnailCard from '@components/ui/ThumbnailCard/ThumbnailCard';

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <SnackRainContainer />
      <PageContainer>
        <BannerWrapper>
          <img alt="로고 이미지" src={AppleImage} />
          <BannerInner>
            <h1>Snack Game</h1>
            <p>
              {`\n재미있는 시간을 보내고 싶으신가요?\n사과게임과 함께 여러분을 즐겁게 할\n 다양한 게임들을 준비하고 있습니다!\n`}
            </p>
          </BannerInner>
        </BannerWrapper>
        <CardsWrapper>
          <ThumbnailCard
            thumbNail={AppleGameImage}
            title={'사과 떨구기'}
            description={
              '드래그 영역의 사과 숫자합이 10이되면 점수를 얻습니다!\n 황금 사과를 제거해 판을 새로고치고 높은 점수를 받아보아요!'
            }
          >
            <Link to={'/apple-game/apple-apple-game'}>
              <Button content={'입장'}></Button>
            </Link>
          </ThumbnailCard>
        </CardsWrapper>
        <TeamInfo />
      </PageContainer>
    </>
  );
};

export default MainPage;

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 3rem 1.25rem;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & > img {
    margin-left: auto;
    margin-right: auto;
    width: 12rem;
    height: 12rem;
  }
`;

const BannerInner = styled.div`
  text-align: center;
  width: 100%;

  @media (min-width: 1024px) {
    width: 66%;
  }

  & > h1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #111827;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 500;

    @media (min-width: 640px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }

  & > p {
    white-space: pre-line;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  flex-wrap: wrap;
  justify-content: center;

  & > h1 {
    margin-bottom: 1rem;
    color: #111827;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 500;

    @media (min-width: 640px) {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }
`;
