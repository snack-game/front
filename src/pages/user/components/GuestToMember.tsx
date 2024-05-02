import { ReactNode } from 'react';

import AwardIcon from '@assets/icon/award.svg?react';
import EditIcon from '@assets/icon/edit.svg?react';
import GroupIcon from '@assets/icon/group.svg?react';
import OAuth from '@components/Auth/OAuth';
import Spacing from '@components/Spacing/Spacing';

import { useIntegrateMember } from '@hooks/queries/members.query';

const memberOnlyFeature: FeatureProps[] = [
  {
    svg: <GroupIcon />,
    name: '그룹 가입',
    description: '다른 유저들과\n팀을 이룰 수 있어요',
  },
  {
    svg: <EditIcon />,
    name: '프로필 수정',
    description: '이름, 그룹, 프로필 이미지를\n자유롭게 수정할 수 있어요',
  },
  {
    svg: <AwardIcon />,
    name: '랭킹 진입',
    description: '다른 유저들과\n순위를 겨룰 수 있어요',
  },
];

const GuestToMember = () => {
  const integrateMember = useIntegrateMember();

  const onOAuthSuccess = async () => {
    return await integrateMember.mutateAsync();
  };

  return (
    <div className="mb-8 w-4/5 rounded-md bg-white px-4 pb-12 pt-8 text-center">
      <p className="whitespace-pre-line text-primary-deep-dark">
        {`회원으로 전환하면\n더 많은 기능을 사용할 수 있어요!`}
      </p>
      <div className="md:flex md:justify-around">
        {memberOnlyFeature.map((feature) => (
          <Feature key={feature.name} {...feature} />
        ))}
      </div>
      <Spacing size={3} />
      <OAuth oAuthOnSuccess={onOAuthSuccess} />
    </div>
  );
};

interface FeatureProps {
  svg: ReactNode;
  name: string;
  description: string;
}

const Feature = ({ svg, name, description }: FeatureProps) => {
  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="mb-2 h-[64px] w-[64px] text-primary">{svg}</div>
      <p className="text-lg font-semibold text-primary">{name}</p>
      <p className="whitespace-pre-line text-center text-primary-deep-dark">
        {description}
      </p>
    </div>
  );
};

export default GuestToMember;
