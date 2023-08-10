import React, { RefObject, useRef } from 'react';

import styled from '@emotion/styled';

import AppleGame from '@components/games/AppleGame';

import { useClientRect } from '@hooks/useClientRect';

const AppleGameWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 720px;
`;

const AppleGameContainer = () => {
  const canvasBaseRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const { width, height } = useClientRect({ canvasBaseRef });

  return (
    <AppleGameWrapper ref={canvasBaseRef}>
      <AppleGame clientWidth={width} clientHeight={height} />
    </AppleGameWrapper>
  );
};

export default AppleGameContainer;
