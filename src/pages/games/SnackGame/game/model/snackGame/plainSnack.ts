import AppleImage from '@assets/images/snack.png';

import Snack, { SnackPropType } from './snack';

class PlainSnack extends Snack {
  constructor(appleProp: SnackPropType) {
    super({ ...appleProp });
    super.setImage(AppleImage);
  }
}

export default PlainSnack;
