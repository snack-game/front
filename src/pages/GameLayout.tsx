import { Outlet } from 'react-router-dom';

import { BottomNav } from '@components/BottomNav/BottomNav';

const GameLayout = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
};

export default GameLayout;
