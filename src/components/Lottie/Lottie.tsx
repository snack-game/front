import { Ref } from 'react';

import { LottieOptionTypes } from '@utils/types/common.type';

import useLottie from '@hooks/useLottie';

interface LottieProps {
  lottieOptions: LottieOptionTypes;
  width: number;
  height: number;
}

const Lottie = ({ width, height, lottieOptions }: LottieProps) => {
  const { ref } = useLottie(lottieOptions);

  return (
    <div
      ref={ref}
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default Lottie;
