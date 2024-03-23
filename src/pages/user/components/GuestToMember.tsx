import { useNavigate } from 'react-router-dom';

import AwardIcon from '@assets/icon/award.svg';
import EditIcon from '@assets/icon/edit.svg';
import GroupIcon from '@assets/icon/group.svg';
import OAuth from '@components/Auth/OAuth';
import Spacing from '@components/Spacing/Spacing';

import { useIntegrateMember } from '@hooks/queries/members.query';

const memberOnlyFeature = [
  {
    imgSrc: GroupIcon,
    name: '그룹 가입',
    description: '다른 유저들과\n팀을 이룰 수 있어요',
  },
  {
    imgSrc: EditIcon,
    name: '프로필 수정',
    description: '이름, 그룹, 프로필 이미지를\n자유롭게 수정할 수 있어요',
  },
  {
    imgSrc: AwardIcon,
    name: '랭킹 진입',
    description: '다른 유저들과\n순위를 겨룰 수 있어요',
  },
];

const GuestToMember = () => {
  const integrateMember = useIntegrateMember();
  const navigate = useNavigate();

  const onOAuthSuccess = async () => {
    const response = await integrateMember.mutateAsync();
    navigate(0);
    return response;
  };

  return (
    <div className="mb-8 w-4/5 rounded-md bg-white px-4 py-8 text-center">
      <p>회원으로 전환하면 더 많은 기능을 사용할 수 있어요!</p>
      <div className="md:flex md:justify-around">
        {memberOnlyFeature.map((feature) => (
          <Feature key={feature.name} {...feature} />
        ))}
      </div>
      <Spacing size={2} />
      <OAuth oAuthOnSuccess={onOAuthSuccess} />
    </div>
  );
};

interface FeatureProps {
  imgSrc: string;
  name: string;
  description: string;
}

const Feature = ({ imgSrc, name, description }: FeatureProps) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <img src={imgSrc} className="mb-2 h-[72px] w-[72px]" alt={name} />
      <p className="text-lg font-semibold">{name}</p>
      <p className="whitespace-pre-line text-center">{description}</p>
    </div>
  );
};

export default GuestToMember;
