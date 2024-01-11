import { ReactNode } from 'react';

import Button from '@components/Button/Button';
import RouterLink from '@components/RouterLink/RouterLink';

interface HeaderProps {
  nav?: ReactNode;
}

const Header = ({ nav }: HeaderProps) => {
  const handleLogin = () => {
    console.log('login');
  };

  return (
    <header className="fixed z-50 w-full bg-white shadow-md">
      <div className={'mx-auto flex h-16 max-w-7xl items-center px-4 lg:px-6'}>
        <RouterLink to={'/'} hover={false} className={'flex flex-1'}>
          <span className={'ml-2 text-2xl text-primary'}>Snack Game</span>
        </RouterLink>

        <nav className={'flex flex-1 justify-center'}>{nav}</nav>

        <div className="flex flex-1 justify-end">
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
