import { memo, useEffect, useRef } from 'react';

import { Application, EventEmitter } from 'pixi.js';

import { toastStateType } from '@utils/types/common.type';

import useError from '@hooks/useError';
import useToast from '@hooks/useToast';

import usePixiCanvas from './hook/usePixiCanvas';

export const app = new Application();
export const eventEmitter = new EventEmitter();

const SnackGameBase = () => {
  const canvasBaseRef = useRef<HTMLDivElement>(null);
  const openToast = useToast();
  const setError = useError();
  usePixiCanvas({ canvasBaseRef });

  useEffect(() => {
    const handleToastEvent = (data: toastStateType) => {
      openToast(data.message, data.type);
    };

    const handleErrorEvent = (error: Error) => {
      setError(error);
    };

    eventEmitter.on('openToast', handleToastEvent);
    eventEmitter.on('error', handleErrorEvent);

    return () => {
      eventEmitter.off('openToast', handleToastEvent);
      eventEmitter.off('error', handleErrorEvent);
    };
  }, []);

  return (
    <div ref={canvasBaseRef} className={'mx-auto h-full w-full max-w-xl'}></div>
  );
};

export default memo(SnackGameBase);
