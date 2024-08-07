import { useTranslation } from 'react-i18next';

import TopBar from '@components/TopBar/TopBar';

import PATH from '@constants/path.constant';

const WithdrawPage = () => {
  const { t } = useTranslation('setting');

  return (
    <>
      <TopBar title={t('withdraw')} backUrl={PATH.SETTING} />
    </>
  );
};

export default WithdrawPage;
