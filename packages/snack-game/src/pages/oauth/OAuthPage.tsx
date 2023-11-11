import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import PATH from '@constants/path.constant';
import { useSocial } from '@hooks/queries/auth.query';
import { useInternalRouter } from '@hooks/useInternalRouter';

const OAuthPage = () => {
  const oAuthToken = useSocial();
  const { push } = useInternalRouter();

  useEffect(() => {
    oAuthToken.mutateAsync().then(() => {
      push(PATH.HOME);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Snack Game || OAuth</title>
      </Helmet>
    </>
  );
};

export default OAuthPage;
