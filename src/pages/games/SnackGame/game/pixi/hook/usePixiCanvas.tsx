import { RefObject, useEffect } from 'react';

import { GameScreen } from '../screen/GameScreen';
import { LoadScreen } from '../screen/LoadScreen';
import { LobbyScreen } from '../screen/LobbyScreen';
import { app } from '../SnackGameBase';
import { initAssets } from '../util/assets';
import { getUrlParam } from '../util/getUrlParams';
import { navigation } from '../util/navigation';

interface usePixiCanvasProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

const usePixiCanvas = ({ canvasBaseRef }: usePixiCanvasProps) => {
  useEffect(() => {
    initCanvas();

    // resize 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  const initCanvas = async () => {
    // pixi 초기화
    await app.init({
      resolution: Math.max(window.devicePixelRatio, 2),
      backgroundColor: 0xffedd5,
    });

    canvasBaseRef.current?.appendChild(app.canvas);

    window.addEventListener('resize', resize);

    resize();

    await initAssets(); // 필요 Assets 초기화

    await navigation.showScreen(LoadScreen);

    await navigation.showScreen(LobbyScreen);
  };

  const resize = () => {
    if (canvasBaseRef.current) {
      // canvasBase의 높이, 넓이 기준으로 canvas의 크기 설정
      const width = canvasBaseRef.current.offsetWidth;
      const height = canvasBaseRef.current.offsetHeight;

      app.canvas.style.width = `${width}px`;
      app.canvas.style.height = `${height}px`;

      app.renderer.resize(width, height);
      navigation.resize(width, height);
    }
  };
};

export default usePixiCanvas;
