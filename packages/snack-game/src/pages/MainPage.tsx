import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import AppleGameImage from '@assets/images/apple-game.jpg';
import PageContainer from '@components/base/PageContainer';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

interface AppleGameProps {
  children?: never;
}

const MainPage: FC<AppleGameProps> = () => {
  return (
    <div>
      <Helmet>
        <title>Snack Game || Main</title>
      </Helmet>
      <Header />
      <PageContainer>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-kcc font-medium title-font mb-4 text-gray-900">
              Games
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div
              className="lg:w-1/3 sm:w-1/2 p-4 cursor-pointer"
              onClick={() => {
                location.href = '/game/apple-game';
              }}
            >
              <div className="flex relative">
                <img
                  alt="사과게임 이미지"
                  className="absolute inset-0 w-full h-full object-cover object-center rounded-xl border-4 border-gray-200"
                  src={AppleGameImage}
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 rounded-xl">
                  <h2 className="tracking-widest text-sm title-font font-medium text-red-500 mb-1">
                    중독적인 사과 떨구기!
                  </h2>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    사과게임
                  </h1>
                  <p className="leading-relaxed">
                    {
                      '드래그 영역의 사과들의 숫자합이 10이 되면 점수를 얻는 게임입니다! 황금사과를 제거해 사과를 새로고침 해보세요!'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
};

export default MainPage;
