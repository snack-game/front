import { FC, useEffect, useRef } from 'react';

import AppleImage from '@assets/images/apple.webp';
import { AppleDrop } from '@modules/game/apple-drop';

interface DropApplesProps {
  children?: never;
}

const DropApples: FC<DropApplesProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let appleDrop: AppleDrop | null = null;

  useEffect(() => {
    if (canvasRef.current) {
      appleDrop = new AppleDrop(canvasRef.current, AppleImage);
      appleDrop.init();
      appleDrop.update();
    }

    return () => {
      if (appleDrop) {
        appleDrop.destroy();
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className={'w-screen h-full -z-10 fixed'}></canvas>
  );
};

export default DropApples;
