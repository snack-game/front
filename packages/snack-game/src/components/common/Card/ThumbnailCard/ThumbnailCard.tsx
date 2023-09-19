import * as Styled from './ThumbnailCard.style';

interface ThumbnailCardProps {
  imgSrc?: string;
  title?: string;
  content?: string;
}

const ThumbnailCard = ({ title, content, imgSrc }: ThumbnailCardProps) => {
  return (
    <Styled.ThumbnailCardContainer>
      {imgSrc && (
        <Styled.Thumbnail>
          <img src={imgSrc} alt={'사람 이미지'} />
        </Styled.Thumbnail>
      )}
      <Styled.Info>
        <h2>{title}</h2>
        <p>{content}</p>
      </Styled.Info>
    </Styled.ThumbnailCardContainer>
  );
};

export default ThumbnailCard;
