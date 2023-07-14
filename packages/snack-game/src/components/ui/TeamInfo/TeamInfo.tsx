import styled from '@emotion/styled';

import ChilImage from '@assets/images/0chil.jpg';
import DongSuImage from '@assets/images/dongsu.webp';
import TeamCard from '@components/ui/TeamInfo/TeamCard/TeamCard';

const TeamInfo = () => {
  const teamInfoList = [
    {
      imgSrc: DongSuImage,
      name: 'dev-dong-su',
      position: 'Front-End, Game Developer',
      intro:
        '긍정적으로 생각하기 좋아하고\n작은 일에서 행복을 찾는 삶을좋아합니다.\n',
      githubUrl: 'https://github.com/dev-dong-su',
    },
    {
      imgSrc: ChilImage,
      name: '0chil',
      position: 'Back-End Developer',
      intro: '하나의 목적으로 움직이는 팀을\n만들고자 합니다.\n',
      githubUrl: 'https://github.com/0chil',
    },
  ];

  return (
    <Wrapper>
      <Title>OUR TEAM</Title>
      <TeamCardsWrapper>
        {teamInfoList.map((teamInfo) => (
          <TeamCard key={teamInfo.name} {...teamInfo} />
        ))}
      </TeamCardsWrapper>
    </Wrapper>
  );
};

export default TeamInfo;

export const Wrapper = styled.div`
  padding: 6rem 1.25rem 3rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  text-align: center;
  flex-direction: column;
  width: 100%;
  color: #111827;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
`;

export const TeamCardsWrapper = styled.div`
  display: flex;
  margin: -1rem;
  flex-wrap: wrap;
  justify-content: center;
`;
