import LoadingImage from '@assets/images/logo.avif';

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
      <img
        src={LoadingImage}
        alt={'loading image'}
        className="h-10 w-10 animate-spin"
      />
    </div>
  );
};

export default Loading;
