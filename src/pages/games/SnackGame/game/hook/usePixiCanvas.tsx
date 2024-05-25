import { RefObject, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { pixiState } from '@utils/atoms/game.atom';

import useError from '@hooks/useError';

import { LoadScreen } from '../screen/LoadScreen';
import { LobbyScreen } from '../screen/LobbyScreen';
import { app } from '../SnackGameBase';
import { initAssets } from '../util/assets';
import { navigation } from '../util/navigation';

interface usePixiCanvasProps {
  canvasBaseRef: RefObject<HTMLElement>;
}

const usePixiCanvas = ({ canvasBaseRef }: usePixiCanvasProps) => {
  const [pixiValue, setPixiValue] = useRecoilState(pixiState);
  const setError = useError();

  useEffect(() => {
    initCanvas();

    return () => {
      app.stop;
      window.removeEventListener('resize', resize);
    };
  }, []);

  /** pixi 초기화 */
  const initCanvas = async () => {
    // pixi canvas를 초기화 합니다.
    try {
      if (!pixiValue.pixiInit) {
        await app.init({
          resolution: Math.max(window.devicePixelRatio, 2),
          backgroundColor: 0xffedd5,
        });

        setPixiValue((pre) => ({
          ...pre,
          pixiInit: true, // 초기화 성공
        }));
      }
    } catch (e) {
      console.log(e);
      setError(new Error('pixi 초기화에 실패했습니다.'));
    }

    canvasBaseRef.current?.appendChild(app.canvas);

    window.addEventListener('resize', resize);

    resize();

    try {
      if (!pixiValue.assetsInit) {
        await initAssets(); // 필요 Assets 초기화

        await navigation.showScreen(LoadScreen); // 로딩 화면

        setPixiValue((pre) => ({
          ...pre,
          assetsInit: true, // assets 로딩 성공
        }));

        await navigation.showScreen(LobbyScreen);
      }
    } catch (e) {
      console.log(e);
      setError(new Error('필요 assets 로딩에 실패했습니다.'));
    }
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
