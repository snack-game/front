interface ImageSource {
  srcSet: string;
  type: 'avif' | 'webp' | 'png' | 'jpg' | 'jpeg';
}

interface ImageWithFallbackProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  sources: ImageSource[];
}

const ImageWithFallback = ({
  sources,
  ...imgProps
}: ImageWithFallbackProps) => {
  return (
    <picture>
      {sources.map(({ srcSet, type }) => (
        <source key={srcSet} srcSet={srcSet} type={`image/${type}`} />
      ))}
      <img {...imgProps} />
    </picture>
  );
};

export default ImageWithFallback;
