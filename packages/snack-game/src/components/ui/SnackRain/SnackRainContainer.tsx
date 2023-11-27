import React, { RefObject, useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import SnackRain from '@components/ui/SnackRain/SnackRain';

import { useClientRect } from '@hooks/useClientRect';

const SnackRainWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -50;
`;

const SnackRainContainer = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const clientRect = useClientRect({ canvasBaseRef });

  useEffect(() => {
    clientRect();

    window.addEventListener('resize', clientRect);

    return () => {
      window.removeEventListener('resize', clientRect);
    };
  }, []);

  return (
    <SnackRainWrapper ref={canvasBaseRef}>
      <SnackRain />
    </SnackRainWrapper>
  );
};

export default SnackRainContainer;
