import AppleImage from '@assets/images/apple.png';
import CandyImage from '@assets/images/candy.png';
import ChocolateImage from '@assets/images/chocolate.png';
import CookieImage from '@assets/images/cookie.png';
import JellyImage from '@assets/images/jelly.png';

export const loadedImages = [
  CandyImage,
  AppleImage,
  JellyImage,
  CookieImage,
  ChocolateImage,
].map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});
