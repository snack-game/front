import { RefObject } from 'react';

import { useSetRecoilState } from 'recoil';

import { setAppleGameOffsetState } from '@utils/atoms/game.atom';

import useDebouncedCallback from '@hooks/useDebouncedCallback';

interface useClientRectProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

export const useClientRect = ({ canvasBaseRef }: useClientRectProps) => {
  const setAppleGameOffset = useSetRecoilState(setAppleGameOffsetState);

  return useDebouncedCallback({
    target: () => {
      if (canvasBaseRef.current) {
        const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
          canvasBaseRef.current;
        setAppleGameOffset({
          offsetWidth,
          offsetHeight,
          offsetLeft,
          offsetTop,
        });
      }
    },
    delay: 300,
  });
};
