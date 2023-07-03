import React, { FC, RefObject, useRef } from 'react';

import SnackRain from '@components/SnackRain';

import { useClientRect } from '@hooks/useClientRect';

interface SnackRainBaseProps {
  children?: never;
}

const SnackRainContainer: FC<SnackRainBaseProps> = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { width, height } = useClientRect(canvasBaseRef);

  return (
    <div ref={canvasBaseRef} className={'w-screen h-full -z-10 fixed'}>
      <SnackRain clientWidth={width} clientHeight={height} />
    </div>
  );
};

export default SnackRainContainer;
