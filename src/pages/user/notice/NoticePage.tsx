import { useTranslation } from 'react-i18next';

import TopBar from '@components/TopBar/TopBar';

import PATH from '@constants/path.constant';

const NoticePage = () => {
  const { t } = useTranslation('setting');

  return (
    <div className="flex h-[100dvh] flex-col">
      <TopBar title={t('notice')} backUrl={PATH.SETTING} />
      <iframe
        src="https://notice.snackga.me/"
        referrerPolicy="strict-origin-when-cross-origin"
        className="flex h-full w-full"
        title="notice"
      ></iframe>
    </div>
  );
};

export default NoticePage;
