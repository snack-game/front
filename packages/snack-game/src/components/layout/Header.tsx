import { FC } from 'react';

import LogoImage from '@assets/images/logo.png';

interface HeaderProps {
  children?: never;
}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
      <a
        className="mb-4 flex items-center font-medium text-gray-900 title-font md:mb-0"
        href={'/'}
      >
        <img src={LogoImage} alt={'로고 이미지'} className={'w-8 h-8'} />
        <span className="ml-3 text-xl">Snack Game</span>
      </a>
      <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
        <a className="mr-5 hover:text-gray-900">로그인</a>
      </nav>
    </div>
  );
};

export default Header;
