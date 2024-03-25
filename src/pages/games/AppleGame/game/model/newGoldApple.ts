import GoldenAppleImage from '@assets/images/golden_apple.png';

import NewApple, { NewApplePropType } from './newApple';

export class NewGoldenApple extends NewApple {
  constructor(appleProp: NewApplePropType) {
    super({ ...appleProp });
    super.setImage(GoldenAppleImage);
  }
}
