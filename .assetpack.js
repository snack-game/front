import { pixiPipes } from '@assetpack/core/pixi';

export default {
  entry: './raw-assets',
  output: './public/assets/',
  cache: false,
  pipes: [
    ...pixiPipes({
      compression: { jpg: true, png: true, webp: false },
      texturePacker: { removeFileExtension: true },
      manifest: { output: './public/assets/assets-manifest.json' },
    }),
  ],
};
