import * as Styled from './ThumbnailCard.style';

interface ThumbnailCardProps {
  imgSrc?: string;
  title?: string;
  subTitle?: string;
  content?: string;
}

const ThumbnailCard = ({
  title,
  content,
  subTitle,
  imgSrc,
}: ThumbnailCardProps) => {
  return (
    <Styled.ThumbnailCardContainer>
      {imgSrc && (
        <Styled.Thumbnail>
          <img src={imgSrc} alt={'사람 이미지'} />
        </Styled.Thumbnail>
      )}
      <Styled.Info>
        <h2>{title}</h2>
        <span>{subTitle}</span>
        <p>{content}</p>
      </Styled.Info>
    </Styled.ThumbnailCardContainer>
  );
};

export default ThumbnailCard;
