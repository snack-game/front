import GoldenAppleImage from '@assets/images/golden_snack.png';

import Snack, { SnackPropType } from './snack';

export class GoldenSnack extends Snack {
  constructor(appleProp: SnackPropType) {
    super({ ...appleProp });
    super.setImage(GoldenAppleImage);
  }
}
