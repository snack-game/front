const Footer = () => {
  return (
    <footer className="body-font mt-16 text-gray-600">
      <div className="container mx-auto flex flex-col items-center px-5 py-8 sm:flex-row">
        <a className="title-font flex items-center justify-center font-medium text-primary md:justify-start">
          <span className="ml-3 text-xl">Snack Game</span>
        </a>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4">
          © 2023 Snack Game — @dev-dong-su, @0cil, @Hwanvely
        </p>
      </div>
    </footer>
  );
};

export default Footer;
