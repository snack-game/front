import BombImage from '@assets/images/bomb.avif';
import BombWebpImage from '@assets/images/bomb.webp';
import FeverImage from '@assets/images/fever.avif';
import FeverWebpImage from '@assets/images/fever.webp';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';

const itemImgSrc: Record<string, string[]> = {
  BOMB: [BombImage, BombWebpImage],
  FEVER_TIME: [FeverImage, FeverWebpImage],
};

const Item = ({ type, count }: { type: string; count: number }) => {
  const imgSrc = itemImgSrc[type];
  return (
    <div className="relative flex flex-col items-center">
      <ImageWithFallback
        sources={[{ srcSet: imgSrc[0], type: 'avif' }]}
        src={imgSrc[1]}
        alt={`${type} item`}
        className="h-12 w-12"
      />
      <span className="absolute bottom-[-25%] right-[-15%] rounded-full border border-black bg-white px-2 text-sm text-black">
        {count}
      </span>
    </div>
  );
};

export default Item;
