import { Assets, AssetsManifest } from 'pixi.js';

/** 동적 로딩을 위해 번들로 그룹화된 에셋 목록 */
let assetsManifest: AssetsManifest = { bundles: [] };

/** 이미 로드된 번들 저장 */
const loadedBundles: string[] = [];

/** 에셋 매니페스트에 번들이 존재하는지 확인 */
function checkBundleExists(bundle: string) {
  return !!assetsManifest.bundles.find((b) => b.name === bundle);
}

/** 아직 로드되지 않은 에셋 번들 로드 */
export async function loadBundles(bundles: string | string[]) {
  if (typeof bundles === 'string') bundles = [bundles];

  // 요청된 번들이 존재하는지 확인
  for (const bundle of bundles) {
    if (!checkBundleExists(bundle)) {
      throw new Error(`[Assets] Invalid bundle: ${bundle}`);
    }
  }

  // 이미 로드된 번들은 제외
  const loadList = bundles.filter((bundle) => !loadedBundles.includes(bundle));

  // 로드할 번들이 없으면 스킵
  if (!loadList.length) return;

  // 번들 로드
  console.log('[Assets] Load:', loadList.join(', '));
  await Assets.loadBundle(loadList);

  // 로드된 번들을 로드된 목록에 추가
  loadedBundles.push(...loadList);
}

/** 모든 번들이 로드되었는지 확인, 하나라도 로드되지 않았다면 false 반환 */
export function areBundlesLoaded(bundles: string[]) {
  for (const name of bundles) {
    // 로드된 목록에 없는 번들이 있으면 false 반환
    if (!loadedBundles.includes(name)) {
      return false;
    }
  }

  // 제공된 모든 번들이 로드됨
  return true;
}

/** 에셋팩에서 생성된 에셋 json 매니페스트 가져오기 */
async function fetchAssetsManifest(url: string) {
  const response = await fetch(url);
  const manifest = await response.json();
  if (!manifest.bundles) {
    throw new Error('[Assets] Invalid assets manifest');
  }
  return manifest;
}

/** 에셋 초기화 및 모든 에셋의 배경 로딩 시작 */
export async function initAssets() {
  // 에셋 매니페스트 로드
  assetsManifest = await fetchAssetsManifest('/assets/assets-manifest.json');

  // 이 매니페스트로 PixiJS 에셋 초기화
  await Assets.init({ manifest: assetsManifest, basePath: '/assets' });

  // 로딩 화면용 에셋 로드
  await loadBundles('preload');

  // 모든 존재하는 번들 이름 나열
  const allBundles = assetsManifest.bundles.map((item) => item.name);

  // 모든 번들의 배경 로딩 시작
  Assets.backgroundLoadBundle(allBundles);
}
