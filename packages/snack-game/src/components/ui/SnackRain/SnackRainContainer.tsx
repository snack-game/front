import React from 'react';

import styled from '@emotion/styled';

import SnackRain from '@components/ui/SnackRain/SnackRain';

import { useCanvasOffset } from '@hooks/useCanvasOffset';

const SnackRainWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -50;
`;

const SnackRainContainer = () => {
  const { canvasBaseRef, offsetWidth, offsetHeight } = useCanvasOffset();

  return (
    <SnackRainWrapper ref={canvasBaseRef}>
      <SnackRain offsetWidth={offsetWidth} offsetHeight={offsetHeight} />
    </SnackRainWrapper>
  );
};

export default SnackRainContainer;
