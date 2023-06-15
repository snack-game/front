import { FC } from 'react';

interface FooterProps {
  children?: never;
}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
      <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <span className="ml-3 text-xl">SnackGame</span>
      </a>
      <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
        © 2023 SnackGame —
        <a
          className="text-gray-600 ml-1"
          rel="noopener noreferrer"
          target="_blank"
        >
          @dev-dong-su, @0chil
        </a>
      </p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start text-xs text-gray-500">
        <a href="https://www.flaticon.com/kr/free-icons/" title="아이콘">
          아이콘 제작자: Freepik - Flaticon
        </a>
      </span>
    </div>
  );
};

export default Footer;
