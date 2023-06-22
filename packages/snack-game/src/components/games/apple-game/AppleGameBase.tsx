import React, { FC, RefObject, useRef } from 'react';

import AppleGame from '@components/games/apple-game/AppleGame';

import { useClientRect } from '@hooks/useClientRect';

interface CanvasBaseProps {
  children?: never;
}

const AppleGameBase: FC<CanvasBaseProps> = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { width, height } = useClientRect(canvasBaseRef);

  return (
    <div ref={canvasBaseRef} className={'w-[90%] h-[800px] mx-auto'}>
      <AppleGame clientWidth={width} clientHeight={height} />
    </div>
  );
};

export default AppleGameBase;
