import { FC } from 'react';

import ChilImage from '@assets/images/0chil.jpg';
import DongSuImage from '@assets/images/dongsu.webp';

import * as Styled from './TeamInfo.style';

interface TeamInfoProps {
  children?: never;
}

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

const TeamInfo: FC<TeamInfoProps> = () => {
  return (
    <Styled.Wrapper>
      <Styled.Title>OUR TEAM</Styled.Title>
      <Styled.TeamInfoWrapper>
        {teamInfoList.map((teamInfo) => (
          <Styled.TeamInfoInner key={teamInfo.name}>
            <Styled.TeamInfoThumbnail
              alt={teamInfo.name}
              src={teamInfo.imgSrc}
              loading="lazy"
            />
            <Styled.TeamInfo>
              <Styled.Name>{teamInfo.name}</Styled.Name>
              <Styled.Position>{teamInfo.position}</Styled.Position>
              <Styled.Intro>{teamInfo.intro}</Styled.Intro>
              <a href={teamInfo.githubUrl} title={`${teamInfo.name} github`}>
                <Styled.GithubIcon viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </Styled.GithubIcon>
              </a>
            </Styled.TeamInfo>
          </Styled.TeamInfoInner>
        ))}
      </Styled.TeamInfoWrapper>
    </Styled.Wrapper>
  );
};

export default TeamInfo;
