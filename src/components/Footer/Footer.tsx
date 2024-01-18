const Footer = () => {
  return (
    <footer className="body-font mx-auto mt-24 w-full max-w-7xl text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        <a className="title-font flex items-center justify-center font-medium text-primary md:justify-start">
          <span className="ml-3 text-xl">Snack Game</span>
        </a>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          © 2023 Snack Game — @dev-dong-su, @0cil, @Hwanvely
        </p>
        <div className={'ml-auto text-xs text-gray-500'}>
          <a href="https://www.flaticon.com/kr/free-icons/" title="아이콘">
            Icons: Freepik, Triangle Squad, IYAHICON from www.flaticon.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
