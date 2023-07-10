import React, { FC, RefObject, useRef } from 'react';

import styled from '@emotion/styled';

import SnackRain from '@components/common/SnackRain';

import { useClientRect } from '@hooks/useClientRect';

interface SnackRainBaseProps {
  children?: never;
}

const SnackRainWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -50;
`;

const SnackRainContainer: FC<SnackRainBaseProps> = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { width, height } = useClientRect({ canvasBaseRef });

  return (
    <SnackRainWrapper ref={canvasBaseRef}>
      <SnackRain clientWidth={width} clientHeight={height} />
    </SnackRainWrapper>
  );
};

export default SnackRainContainer;
