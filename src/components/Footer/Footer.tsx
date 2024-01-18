import { Link } from 'react-router-dom';

import PATH from '@constants/path.constant';

const Footer = () => {
  return (
    <footer className="body-font mx-auto mt-24 w-full max-w-7xl text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 lg:flex-row lg:justify-evenly">
        <div className={'flex'}>
          <span className="title-font flex items-center justify-center font-medium text-primary md:justify-start">
            <span className="ml-3 text-xl">Snack Game</span>
          </span>
          <p className="mt-4 text-xs text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
            © 2023 Snack Game — @dev-dong-su, @0cil, @Hwanvely
          </p>
        </div>
        <Link className={'text-xs text-gray-500'} to={PATH.POLICY}>
          개인정보처리방침
        </Link>
        <div className={' text-xs text-gray-500'}>
          <a href="https://www.flaticon.com/kr/free-icons/" title="아이콘">
            Icons: Freepik, Triangle Squad, IYAHICON from www.flaticon.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
