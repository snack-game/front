import React, { RefObject, useRef } from 'react';

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

  const { clientWidth, clientHeight } = useClientRect({ canvasBaseRef });

  return (
    <SnackRainWrapper ref={canvasBaseRef}>
      <SnackRain clientWidth={clientWidth} clientHeight={clientHeight} />
    </SnackRainWrapper>
  );
};

export default SnackRainContainer;
