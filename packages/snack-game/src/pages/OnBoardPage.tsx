import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import AppleImage from '@assets/images/apple.png';
import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button';
import DropApples from '@components/DropApples';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';
import TeamInfo from '@components/TeamInfo';

interface MainPageProps {
  children?: never;
}

const AuthPage: FC<MainPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Auth</title>
      </Helmet>
      <DropApples />
      <Header />
      <PageContainer>
        <div className="flex flex-col container h-[600px] py-12 mx-auto px-5 items-center justify-around">
          <img
            className="mx-auto animate-waving-apple w-48 h-48"
            alt="로고 이미지"
            src={AppleImage}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Snack Game
            </h1>
            <p className="mb-8 leading-relaxed whitespace-pre">
              {
                '\n재미있는 시간을 보내고 싶으신가요?\n사과게임과 함께 여러분을 미소 짓게 만들어줄\n 다양한 게임들을 준비하고 있습니다!\n'
              }
            </p>
            <div className="flex justify-center">
              <Button
                content={'입장'}
                className={'mx-auto xl:mx-0'}
                onClick={() => {
                  location.href = '/main';
                }}
              ></Button>
            </div>
          </div>
        </div>
        <TeamInfo></TeamInfo>
      </PageContainer>
      <Footer></Footer>
    </>
  );
};

export default AuthPage;
