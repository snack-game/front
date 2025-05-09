import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useResetRecoilState } from 'recoil';

import { logOut } from '@api/auth.api';
import TopBar from '@components/TopBar/TopBar';
import { resetUserState, userState } from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useToast from '@hooks/useToast';

import LanguageSelect from './components/LanguageSelect';
import { List } from './components/List';

const SettingPage = () => {
  const { t } = useTranslation('setting');

  const userInfo = useRecoilValue(userState);
  const resetUser = useResetRecoilState(resetUserState);

  const openToast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    resetUser();
    await logOut();
    openToast(t('login_logout'), 'success');
    window.dispatchEvent(new Event('loggedOut'));
    navigate(PATH.SNACK_GAME, { replace: true });
  };

  return (
    <>
      <TopBar title={t('title')} backUrl={PATH.USER} />
      <div>
        <List title={t('account')}>
          <List.Item onClick={handleLogout}> {t('logout')} </List.Item>
          {userInfo.type !== 'GUEST' && (
            <List.Item onClick={() => navigate(PATH.WITHDRAW)}>
              {t('withdraw')}
            </List.Item>
          )}
        </List>
        <List title={t('etc')}>
          <List.Item>
            {t('language')}
            <LanguageSelect />
          </List.Item>
        </List>
        <List title={t('service')}>
          <List.Item
            onClick={() => {
              navigate(PATH.NOTICE);
            }}
          >
            {t('notice')}
          </List.Item>
          <List.Item
            onClick={() => {
              navigate(PATH.POLICY);
            }}
          >
            {t('privacy_policy')}
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default SettingPage;
