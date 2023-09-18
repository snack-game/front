import { useEffect, useRef } from 'react';

import lottie, { AnimationItem } from 'lottie-web';

import { LottieOptionTypes } from '@utils/types/common.type';

const useLottie = (options: LottieOptionTypes) => {
  const {
    loop,
    autoplay,
    assetsPath,
    name,
    animationData,
    controller,
    stopFrame,
    playOnHover,
  } = options;

  const container = useRef<HTMLDivElement | null>(null);
  const player = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (container.current) {
      player.current = lottie.loadAnimation({
        container: container.current,
        loop,
        autoplay,
        renderer: 'svg',
        animationData: animationData,
        assetsPath,
        name,
        rendererSettings: {
          progressiveLoad: true,
          hideOnTransparent: true,
        },
      });

      if (controller && !controller.current) {
        controller.current = player.current;
      }

      if (playOnHover) {
        container.current.addEventListener('mouseenter', () =>
          player.current?.play(),
        );
        container.current.addEventListener('mouseleave', () =>
          player.current?.stop(),
        );
      }

      return () => {
        if (playOnHover) {
          container.current?.removeEventListener('mouseenter', () =>
            player.current?.play(),
          );
          container.current?.removeEventListener('mouseleave', () =>
            player.current?.stop(),
          );
        }

        player.current?.destroy();
      };
    }
  }, [
    assetsPath,
    autoplay,
    controller,
    loop,
    name,
    animationData,
    playOnHover,
    stopFrame,
  ]);

  return { ref: container };
};

export default useLottie;
