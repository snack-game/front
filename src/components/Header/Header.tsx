import LogoImage from '@assets/images/logo.png';
import Button from '@components/Button/Button';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';

const Header = () => {
  return (
    <header className="mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-6">
      <RouterLink to={'#'} hover={false}>
        <img src={LogoImage} alt={'logo image'} className={'h-6 w-6'} />
        <span className={'text-primary-dark ml-2 text-2xl'}>Snack Game</span>
      </RouterLink>

      <nav className="ml-auto flex gap-4 sm:gap-6">
        <RouterLink to={'#'}>
          <span>게임</span>
        </RouterLink>
        <RouterLink to={'#'}>
          <span>블로그</span>
        </RouterLink>
        <RouterLink to={'#'}>
          <span>팀소개</span>
        </RouterLink>
      </nav>

      <Spacing size={1} direction={'horizontal'} />
      <Button size={'md'} style={'border'}>
        Login
      </Button>
    </header>
  );
};

export default Header;
