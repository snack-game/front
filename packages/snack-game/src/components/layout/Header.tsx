import { FC } from 'react';

import LogoImage from '@assets/images/logo.webp';

interface HeaderProps {
  children?: never;
}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <a
        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        href={'/'}
      >
        <img src={LogoImage} alt={'로고 이미지'} className={'w-8 h-8'} />
        <span className="ml-3 text-xl">Snack Game</span>
      </a>
      {/*<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">*/}
      {/*  <a className="mr-5 hover:text-gray-900">도움말</a>*/}
      {/*  <a className="mr-5 hover:text-gray-900">Third Link</a>*/}
      {/*  <a className="mr-5 hover:text-gray-900">Fourth Link</a>*/}
      {/*</nav>*/}
    </div>
  );
};

export default Header;
