import AppleImage from '@assets/images/apple.png';

import NewApple, { NewApplePropType } from './newApple';

class NewPlainApple extends NewApple {
  constructor(appleProp: NewApplePropType) {
    super({ ...appleProp });
    super.setImage(AppleImage);
  }
}

export default NewPlainApple;
