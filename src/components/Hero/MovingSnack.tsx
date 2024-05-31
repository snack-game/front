import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import GoldenSnackImage from '@assets/images/golden_snack.png';
import SnackImage from '@assets/images/snack.png';

const MovingSnack = () => {
  const snackRef = useRef<HTMLImageElement>(null);
  const goldenSnackRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      snackRef.current,
      { y: -15, rotation: 100 },
      { y: 0, rotation: 30, repeat: -1, duration: 1, yoyo: true },
    );
    gsap.fromTo(
      goldenSnackRef.current,
      { y: -15, rotation: 0 },
      { y: 0, rotation: 120, repeat: -1, duration: 1, yoyo: true },
    );
  });

  return (
    <div className="flex gap-8">
      <img ref={snackRef} src={SnackImage} className="mt-20 h-24 w-24" />
      <img ref={goldenSnackRef} src={GoldenSnackImage} className="h-24 w-24" />
    </div>
  );
};

export default MovingSnack;
