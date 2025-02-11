import GoldenAppleImage from '@assets/images/golden_snack.png';

import Apple, { ApplePropType } from './apple';

export class GoldenApple extends Apple {
  constructor(appleProp: ApplePropType) {
    super({ ...appleProp });
    super.setImage(GoldenAppleImage);
  }
}
