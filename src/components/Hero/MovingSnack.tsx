import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import GoldenSnackImage from '@assets/images/golden_snack.png';
import SnackImage from '@assets/images/snack.png';

const MovingSnack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.normal',
        { y: -15, rotation: 100 },
        { y: 0, rotation: 30, repeat: -1, duration: 1, yoyo: true },
      );
      gsap.fromTo(
        '.gold',
        { y: -15, rotation: 0 },
        { y: 0, rotation: 120, repeat: -1, duration: 1, yoyo: true },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="flex gap-8">
      <img src={SnackImage} className="normal mt-20 h-24 w-24" />
      <img src={GoldenSnackImage} className="gold h-24 w-24" />
    </div>
  );
};

export default MovingSnack;
