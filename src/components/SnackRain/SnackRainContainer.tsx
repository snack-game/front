import SnackRain from '@components/SnackRain/SnackRain';

import { useCanvasOffset } from '@hooks/useCanvasOffset';

const SnackRainContainer = () => {
  const { canvasBaseRef, offsetWidth, offsetHeight } = useCanvasOffset();

  return (
    <div
      ref={canvasBaseRef}
      className={'z-snackRain absolute left-0 top-0 h-full w-full bg-game'}
    >
      <SnackRain offsetWidth={offsetWidth} offsetHeight={offsetHeight} />
    </div>
  );
};

export default SnackRainContainer;
