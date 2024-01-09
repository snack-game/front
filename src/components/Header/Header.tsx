import Button from '@components/Button/Button';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';

const Header = () => {
  return (
    <header className="fixed z-50 w-full bg-white shadow-md">
      <div className={'mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-6'}>
        <RouterLink to={'#'} hover={false}>
          <span className={'ml-2 text-2xl text-primary'}>Snack Game</span>
        </RouterLink>

        <Spacing size={1} direction={'horizontal'} />
        <div className={'ml-auto'}>
          <Button size={'md'}>Login</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
