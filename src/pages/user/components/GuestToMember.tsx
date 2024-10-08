import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { getMemberProfile } from '@api/members.api';
import AwardIcon from '@assets/icon/award.svg?react';
import ChartIcon from '@assets/icon/chart.svg?react';
import EditIcon from '@assets/icon/edit.svg?react';
import GroupIcon from '@assets/icon/group.svg?react';
import OAuth from '@components/Auth/OAuth';
import { MemberType } from '@utils/types/member.type';
import { isApp } from '@utils/userAgentIdentifier';

import { useIntegrateMember } from '@hooks/queries/members.query';

const memberOnlyFeature: FeatureProps[] = [
  {
    svg: <GroupIcon />,
    name: 'member_benefit1',
    description: 'member_benefit1_desc',
  },
  {
    svg: <EditIcon />,
    name: 'member_benefit2',
    description: 'member_benefit2_desc',
  },
  {
    svg: <AwardIcon />,
    name: 'member_benefit3',
    description: 'member_benefit3_desc',
  },
  {
    svg: <ChartIcon />,
    name: 'member_benefit4',
    description: 'member_benefit4_desc',
  },
];

const GuestToMember = () => {
  const { t } = useTranslation('user');

  const integrateMember = useIntegrateMember();

  const onOAuthSuccess = async (): Promise<MemberType> => {
    if (isApp()) {
      return await getMemberProfile();
    }
    return await integrateMember.mutateAsync();
  };

  return (
    <div className="mx-4 rounded-md bg-white px-4 pb-8 pt-8 text-center md:w-4/5">
      <OAuth oAuthOnSuccess={onOAuthSuccess} />
      <p className="mt-8 whitespace-pre-line text-primary-deep-dark">
        {t('guest_to_member')}
      </p>
      <div className="flex flex-wrap justify-evenly gap-2">
        {memberOnlyFeature.map((feature) => (
          <Feature key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
};

interface FeatureProps {
  svg: ReactNode;
  name: string;
  description: string;
}

const Feature = ({ svg, name, description }: FeatureProps) => {
  const { t } = useTranslation('user');

  return (
    <div className="mt-8 flex basis-5/12 flex-col items-center gap-4 md:basis-2/12">
      <div className="text-primary">{svg}</div>
      <p className="text-lg font-semibold text-primary">{t(name)}</p>
      <p className="whitespace-pre-line text-center text-primary-deep-dark">
        {t(description)}
      </p>
    </div>
  );
};

export default GuestToMember;
