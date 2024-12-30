import AppleImage from '@assets/images/snack.png';

import Apple, { ApplePropType } from './apple';

class PlainApple extends Apple {
  constructor(appleProp: ApplePropType) {
    super({ ...appleProp });
    super.setImage(AppleImage);
  }
}

export default PlainApple;
