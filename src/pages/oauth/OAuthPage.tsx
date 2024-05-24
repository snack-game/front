import { Helmet } from 'react-helmet-async';

import useOAuth from '@hooks/useOAuth';

const OAuthPage = () => {
  useOAuth();

  return (
    <>
      <Helmet>
        <title>Snack Game || OAuth</title>
      </Helmet>
    </>
  );
};

export default OAuthPage;
