import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useResetRecoilState } from 'recoil';

import authApi from '@api/auth.api';
import TopBar from '@components/TopBar/TopBar';
import { resetUserState } from '@utils/atoms/member.atom';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

import LanguageSelect from './components/LanguageSelect';
import { List } from './components/List';

const SettingPage = () => {
  const { t } = useTranslation();

  const openToast = useToast();
  const resetUser = useResetRecoilState(resetUserState);
  const navigate = useNavigate();
  const { deleteStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const handleLogout = async () => {
    resetUser();
    await authApi.logOut();
    openToast(t('login_logout'), 'success');
    deleteStorageValue();
    navigate(PATH.AUTH, { replace: true });
  };

  return (
    <>
      <TopBar title={t('setting_title')} backUrl={PATH.USER} />
      <div>
        <List title={t('setting_account')}>
          <List.Item onClick={handleLogout}> {t('setting_logout')} </List.Item>
        </List>
        <List title={t('setting_etc')}>
          <List.Item>
            {t('setting_language')}
            <LanguageSelect />
          </List.Item>
        </List>
        <List title={t('setting_service')}>
          <List.Item
            onClick={() => {
              navigate(PATH.POLICY);
            }}
          >
            {t('setting_privacy_policy')}
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default SettingPage;
