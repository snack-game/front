import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import AwardIcon from '@assets/icon/award.svg?react';
import ChartIcon from '@assets/icon/chart.svg?react';
import EditIcon from '@assets/icon/edit.svg?react';
import GroupIcon from '@assets/icon/group.svg?react';
import OAuth from '@components/Auth/OAuth';
import Spacing from '@components/Spacing/Spacing';

import { useIntegrateMember } from '@hooks/queries/members.query';

const memberOnlyFeature: FeatureProps[] = [
  {
    svg: <GroupIcon />,
    name: 'user_member_benefit1',
    description: 'user_member_benefit1_desc',
  },
  {
    svg: <EditIcon />,
    name: 'user_member_benefit2',
    description: 'user_member_benefit2_desc',
  },
  {
    svg: <AwardIcon />,
    name: 'user_member_benefit3',
    description: 'user_member_benefit3_desc',
  },
  {
    svg: <ChartIcon />,
    name: 'user_member_benefit4',
    description: 'user_member_benefit4_desc',
  },
];

const GuestToMember = () => {
  const { t } = useTranslation();

  const integrateMember = useIntegrateMember();

  const onOAuthSuccess = async () => {
    return await integrateMember.mutateAsync();
  };

  return (
    <div className="mb-8 w-4/5 rounded-md bg-white px-4 pb-12 pt-8 text-center">
      <p className="whitespace-pre-line text-primary-deep-dark">
        {t('user_guest_to_member')}
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
  const { t } = useTranslation();

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="text-primary">{svg}</div>
      <p className="text-lg font-semibold text-primary">{t(name)}</p>
      <p className="whitespace-pre-line text-center text-primary-deep-dark">
        {t(description)}
      </p>
    </div>
  );
};

export default GuestToMember;
