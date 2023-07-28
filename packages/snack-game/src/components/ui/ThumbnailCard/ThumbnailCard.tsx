import { FC, ReactNode } from 'react';

import * as Styled from './ThumbnailCard.style';

interface ThumbnailCardProps {
  thumbNail?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
}

const ThumbnailCard: FC<ThumbnailCardProps> = ({
  thumbNail,
  title,
  description,
  children,
}) => {
  return (
    <Styled.Container>
      <Styled.Inner>
        <Styled.Thumbnail src={thumbNail} alt="apple game" />
        <Styled.Contents>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Description>{description}</Styled.Description>
          {children}
        </Styled.Contents>
      </Styled.Inner>
    </Styled.Container>
  );
};

export default ThumbnailCard;
