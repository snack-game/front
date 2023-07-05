import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import AppleGameImage from '@assets/images/apple-game.jpg';
import AppleImage from '@assets/images/apple.png';
import PageContainer from '@components/base/PageContainer';
import SnackRainContainer from '@components/base/SnackRainContainer';
import Button from '@components/common/Button';
import TeamInfo from '@components/TeamInfo';

interface MainPageProps {
  children?: never;
}

const MainPage: FC<MainPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <SnackRainContainer />
      <PageContainer>
        <div className="container mx-auto flex flex-col items-center justify-around px-5 py-12">
          <img
            className="mx-auto h-48 w-48 animate-waving-apple"
            alt="로고 이미지"
            src={AppleImage}
          />
          <div className="w-full text-center lg:w-2/3">
            <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              Snack Game
            </h1>
            <p className="mb-8 whitespace-pre leading-relaxed">
              {
                '\n재미있는 시간을 보내고 싶으신가요?\n사과게임과 함께 여러분을 즐겁게 할\n 다양한 게임들을 준비하고 있습니다!\n'
              }
            </p>
            <div className="container mx-auto px-5 py-12">
              <div className="-m-4 flex flex-wrap justify-center">
                <div className="p-4 md:w-1/2">
                  <div className="h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60">
                    <img
                      className="w-full object-cover object-center md:h-36 lg:h-48"
                      src={AppleGameImage}
                      alt="apple game"
                    />
                    <div className="bg-white p-6">
                      <h1 className="mb-3 text-lg font-medium text-gray-900 title-font">
                        사과 떨구기
                      </h1>
                      <p className="mb-3 leading-relaxed">
                        드래그 영역의 사과 숫자합이 10이되면 점수를 얻습니다!
                        황금 사과를 제거해서 판을 새고로치고 높은 점수를
                        받아보아요!
                      </p>
                      <Button
                        content={'입장'}
                        onClick={() => {
                          location.href = '/game/apple-game';
                        }}
                      ></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TeamInfo></TeamInfo>
      </PageContainer>
    </>
  );
};

export default MainPage;
