import { FC } from 'react';

interface FooterProps {
  children?: never;
}

const Footer: FC<FooterProps> = () => {
  return (
    <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
      <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
        <span className="ml-3 text-xl">SnackGame</span>
      </a>
      <p className="mt-4 text-sm text-gray-500 sm:mt-0 sm:ml-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
        © 2023 SnackGame —
        <a
          className="ml-1 text-gray-600"
          rel="noopener noreferrer"
          target="_blank"
        >
          @dev-dong-su, @0chil
        </a>
      </p>
      <span className="mt-4 inline-flex justify-center text-xs text-gray-500 sm:mt-0 sm:ml-auto sm:justify-start">
        <a href="https://www.flaticon.com/kr/free-icons/" title="아이콘">
          아이콘 제작자: Freepik - Flaticon
        </a>
      </span>
    </div>
  );
};

export default Footer;
