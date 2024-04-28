import AppleImage from '@assets/images/apple.png';

import Snack, { SnackPropType } from './snack';

class PlainSnack extends Snack {
  constructor(appleProp: SnackPropType) {
    super({ ...appleProp });
    super.setImage(AppleImage);
  }
}

export default PlainSnack;
