import LoadingImage from '@assets/images/logo.avif';
import LoadingWebpImage from '@assets/images/logo.webp';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';

interface LoadingProps {
  type?: 'page' | 'component';
}

const Loading = ({ type = 'component' }: LoadingProps) => {
  return (
    <div
      className={`flex items-center justify-center
      ${type === 'page' ? 'h-screen w-screen' : 'h-full w-full'}
    `}
    >
      <ImageWithFallback
        sources={[{ srcSet: LoadingImage, type: 'avif' }]}
        src={LoadingWebpImage}
        alt={'loading image'}
        className="h-10 w-10 animate-spin"
      />
    </div>
  );
};

export default Loading;
