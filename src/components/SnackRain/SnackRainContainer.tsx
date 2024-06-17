import SnackRain from '@components/SnackRain/SnackRain';

import { useCanvasOffset } from '@hooks/useCanvasOffset';

const SnackRainContainer = () => {
  const { canvasBaseRef, offsetWidth, offsetHeight } = useCanvasOffset();

  return (
    <div
      ref={canvasBaseRef}
      className={'absolute left-0 top-0 -z-50 h-full w-full bg-game'}
    >
      <SnackRain offsetWidth={offsetWidth} offsetHeight={offsetHeight} />
    </div>
  );
};

export default SnackRainContainer;
