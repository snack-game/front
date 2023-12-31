import React from 'react';
import { Helmet } from 'react-helmet-async';

import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import PageContainer from '@components/base/PageContainer';
import QueryBoundary from '@components/base/QueryBoundary';
import UserRankingCard from '@components/common/Card/UserRankingCard/UserRankingCard';
import RetryError from '@components/common/Error/RetryError';
import UserRankingCardError from '@components/common/Error/UserRankingCardError';
import RankingTable from '@components/ui/Ranking/RankingTable';
import { userState } from '@utils/atoms/member.atom';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
`;

const RankingPage = () => {
  const userStateValue = useRecoilValue(userState);

  return (
    <>
      <Helmet>
        <title>Snack Game || Ranking</title>
      </Helmet>
      <PageContainer>
        <ContentContainer>
          <QueryBoundary errorFallback={RetryError}>
            <RankingTable />
          </QueryBoundary>
          {userStateValue.member.name && (
            <QueryBoundary errorFallback={UserRankingCardError}>
              <UserRankingCard />
            </QueryBoundary>
          )}
        </ContentContainer>
      </PageContainer>
    </>
  );
};

export default RankingPage;
