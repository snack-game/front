import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {useRecoilValue, useResetRecoilState} from 'recoil';

import AuthContainer from '@components/ui/AuthForm/AuthContainer';
import {resetUserState, userState} from '@utils/atoms/member.atom';

import PATH from '@constants/path.constant';
import useModal from '@hooks/useModal';
import useToast from '@hooks/useToast';

const Header = () => {
  const { openModal } = useModal();
  const openToast = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const resetUser = useResetRecoilState(resetUserState);
  const userInfo = useRecoilValue(userState);

  const handleLogin = () => {
    openModal({ children: <AuthContainer /> });
  };

  const handleLogout = () => {
    resetUser();
    openToast(t('login_logout'), 'success');
    navigate(PATH.HOME, { replace: true });
  };

  return (
    <div></div>
  );
};

export default Header;
