import { Helmet } from 'react-helmet-async';

import SnackGameBase from './SnackGameBase';

const SnackGamePage = () => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Snack Game</title>
      </Helmet>

      <div className={'h-screen bg-game'}>
        <SnackGameBase />
      </div>
    </>
  );
};

export default SnackGamePage;
