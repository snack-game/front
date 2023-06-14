import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import LogoImage from '@assets/images/logo.png';
import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import DropApples from '@components/DropApples';
import Footer from '@components/layout/Footer';
import TeamInfo from '@components/TeamInfo';

interface MainPageProps {
  children?: never;
}

const MainPage: FC<MainPageProps> = () => {
  const handleOnClick = () => {
    location.href = '/game';
  };

  return (
    <>
      <Helmet>
        <title>Snack Game</title>
      </Helmet>
      <DropApples />
      <PageContainer className={'flex flex-col justify-between'}>
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <p className="title-font sm:text-4xl text-2xl text-gray-900 font-kcc">
              Snack Game
            </p>
            <p className="mb-8 leading-relaxed whitespace-pre">
              {
                '\n재미있는 시간을 보내고 싶으신가요?\n사과게임과 함께 여러분을 미소 짓게 만들어줄\n 다양한 게임들을 준비하고 있습니다!\n'
              }
            </p>
            <div className="flex flex-col w-full md:justify-start justify-center items-start gap-2">
              <Input placeholder={'이름'}></Input>
              <Input placeholder={'소속'}></Input>
              <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
                소속을 입력해서 친구들과 랭킹을 겨뤄 보아요!
              </p>
              <Button content={'입장'} onClick={handleOnClick}></Button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="mx-auto animate-waving-apple"
              alt="로고 이미지"
              src={LogoImage}
            />
          </div>
        </div>
        <TeamInfo></TeamInfo>
      </PageContainer>
      <Footer></Footer>
    </>
  );
};

export default MainPage;
