import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import PageContainer from '@components/base/PageContainer';
import GameContainer from '@components/ui/GameContainer/GameContainer';
import AppleGameTutorial from '@components/ui/Tutorial/AppleGameTutorial';

import useLocalStorage from '@hooks/useLocalStorage';
import useModal from '@hooks/useModal';

const AppleGamePage = () => {
  const { storageValue } = useLocalStorage({
    key: 'tutorial',
  });
  const { openModal } = useModal();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (storageValue == undefined) {
      openModal({ children: <AppleGameTutorial /> });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Snack Game || Apple Game</title>
      </Helmet>
      <PageContainer>
        <GameContainer />
      </PageContainer>
    </>
  );
};

export default AppleGamePage;
