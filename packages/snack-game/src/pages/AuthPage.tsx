import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button';

interface AuthPageProps {
  children?: never;
}

const AuthPage: FC<AuthPageProps> = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Auth</title>
      </Helmet>
      <PageContainer>
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              이름과 소속을 입력하고 친구들과 경쟁해보아요!
            </h1>
            <p className="leading-relaxed mt-4">
              원하는 소속을 입력하고 소속끼리 경쟁하고 랭킹을 확인할 수 있어요!
              <br />
              소속과 이름은 자유롭게 변경할 수 있어요!
              <br />
              나중에 사과게임을 즐기실 때 이름을 통해 로그인하실 수 있고 pin
              번호를 설정하셨다면
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5"></h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                이름
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                소속
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <Button
              content={'제출'}
              onClick={() => console.log('asd')}
            ></Button>
            <p className="text-xs text-gray-500 mt-3">
              소속은 나중에 입력해도 괜찮아요!
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default AuthPage;
