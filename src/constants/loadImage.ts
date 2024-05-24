import DarkOrageSnack from '@assets/images/dark_orange_snack.png';
import GoldenSnack from '@assets/images/golden_snack.png';
import OrangSnack from '@assets/images/orange_snack.png';
import PlainSnack from '@assets/images/snack.png';

export const loadedImages = [
  PlainSnack,
  GoldenSnack,
  DarkOrageSnack,
  OrangSnack,
].map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});
