import { memo, useRef } from 'react';

import { Application } from 'pixi.js';

import usePixiCanvas from './hook/usePixiCanvas';

export const app = new Application();

const SnackGameBase = () => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);
  usePixiCanvas({ canvasBaseRef });

  return (
    <div ref={canvasBaseRef} className={'mx-auto h-full w-full max-w-xl'}></div>
  );
};

export default memo(SnackGameBase);
