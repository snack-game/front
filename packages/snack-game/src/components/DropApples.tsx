import { FC, useEffect, useRef } from 'react';

import AppleImage from '@assets/images/logo.png';
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
    <canvas
      ref={canvasRef}
      className={'w-screen h-screen -z-20 absolute'}
    ></canvas>
  );
};

export default DropApples;
