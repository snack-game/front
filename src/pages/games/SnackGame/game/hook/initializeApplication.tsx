import { RefObject, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { pixiState } from '@utils/atoms/game.atom';

import useError from '@hooks/useError';

import { AppScreenPool } from '../screen/appScreenPool';
import { LoadScreen } from '../screen/LoadScreen';
import { LobbyScreen } from '../screen/LobbyScreen';
import { SnackgameApplication } from '../screen/SnackgameApplication';
import { areBundlesLoaded, initAssets, loadBundles } from '../util/assets';

interface Props {
  canvasBaseRef: RefObject<HTMLElement>;
  initializeAppScreens: (app: SnackgameApplication) => Promise<AppScreenPool>;
}

const errorHandler = (e:any)=>{console.log("no error handler yet")};
const application = new SnackgameApplication(new AppScreenPool(), errorHandler);

const initializeApplication = ({
  canvasBaseRef,
  initializeAppScreens,
}: Props) => {
  const [pixiValue, setPixiValue] = useRecoilState(pixiState);
  const setError = useError();

  useEffect(() => {
    application.setError = setError;
    initCanvas().then(loadAdditional);

    return () => {
      application.stop();
    };
  }, []);

  const initCanvas = async () => {
    try { // TODO: 다시 로드할 필요가 없도록 어플리케이션을 유지해야 합니다.

      if(!pixiValue.pixiInit){
        // const application = new SnackgameApplication(new AppScreenPool(), setError);

        await application.init({
          resizeTo: canvasBaseRef.current!,
          resolution: Math.max(window.devicePixelRatio, 2),
          // antialias: true, // 해상도가 훨씬 좋아지긴 하는데, 프레임이 떨어지는 것 같아요
          autoDensity: true,
          backgroundColor: 0xffedd5,
        });

        setPixiValue((pre) => ({ ...pre, pixiInit: true }));

      }

    } catch (e) {
      console.log(e);
      setError(new Error('Pixi 어플리케이션 초기화에 실패했습니다.'));
    }
    application.start()
    canvasBaseRef.current?.appendChild(application.canvas);
  };

  const loadAdditional = async () => {
    try {
      if(!pixiValue.assetsInit){
        await initAssets();
        const loadScreen = new LoadScreen();
        const loadScreenPromise = application.showAppScreen(loadScreen);

        // 로딩중학교
        const appScreenPool = await initializeAppScreens(application);

        const ctors = appScreenPool.initializers.keys();
        for (const ctor of ctors) {
          if (ctor.assetBundles && !areBundlesLoaded(ctor.assetBundles)) {
            await loadBundles(ctor.assetBundles);
          }
        }
        setPixiValue((pre) => ({ ...pre, assetsInit: true }));

        await loadScreenPromise;
        application.show(LobbyScreen);
      }
    } catch (e) {
      console.log(e);
      setError(new Error('구성요소 로딩에 실패했습니다'));
    }
  };
  return application;
};

export default initializeApplication;