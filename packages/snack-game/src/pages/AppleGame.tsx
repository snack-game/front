import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface AppleGameProps {
  children?: never;
}

const AppleGame: FC<AppleGameProps> = () => {
  return (
    <div>
      <Helmet>
        <title>Game</title>
      </Helmet>
    </div>
  );
};

export default AppleGame;
