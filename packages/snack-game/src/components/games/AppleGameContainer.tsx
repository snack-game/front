import React, { FC, RefObject, useRef } from 'react';

import styled from '@emotion/styled';

import AppleGame from '@components/games/AppleGame';

import { useClientRect } from '@hooks/useClientRect';

interface CanvasBaseProps {
  children?: never;
}

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 800px;
`;

const AppleGameContainer: FC<CanvasBaseProps> = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { width, height } = useClientRect({ canvasBaseRef });

  return (
    <AppleGameWrapper ref={canvasBaseRef}>
      <AppleGame clientWidth={width} clientHeight={height} />
    </AppleGameWrapper>
  );
};

export default AppleGameContainer;
