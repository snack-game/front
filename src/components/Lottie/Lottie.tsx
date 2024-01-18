import { LottieOptionTypes } from '@utils/types/common.type';

import useLottie from '@hooks/useLottie';

interface LottieProps {
  lottieOptions: LottieOptionTypes;
  className?: string;
}

const Lottie = ({ className, lottieOptions }: LottieProps) => {
  const { ref } = useLottie(lottieOptions);

  return <div ref={ref} className={className}></div>;
};

export default Lottie;
