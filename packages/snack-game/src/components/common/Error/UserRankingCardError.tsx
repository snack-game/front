import { FallbackProps } from '@components/base/ErrorBoundary';
import Button from '@components/common/Button/Button';
import * as Styled from '@components/common/Card/UserRankingCard/UserRankingCard.style';

const UserRankingCardError = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Styled.UserRankingCardWrapper>
      <Styled.UserRankingCardItem>
        <p>랭킹 정보를 불러오는 중 오류가 발생했습니다!</p>
        <Button onClick={resetErrorBoundary} content={'재시도'} />
      </Styled.UserRankingCardItem>
    </Styled.UserRankingCardWrapper>
  );
};

export default UserRankingCardError;
