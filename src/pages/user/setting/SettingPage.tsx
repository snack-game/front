import { useNavigate } from 'react-router-dom';

import { useResetRecoilState } from 'recoil';

import authApi from '@api/auth.api';
import { resetUserState } from '@utils/atoms/member.atom';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

import { List } from './components/List';

const SettingPage = () => {
  const openToast = useToast();
  const resetUser = useResetRecoilState(resetUserState);
  const navigate = useNavigate();
  const { deleteStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const handleLogout = async () => {
    resetUser();
    await authApi.logOut();
    openToast('로그아웃 성공!', 'success');
    deleteStorageValue();
    navigate(PATH.MAIN, { replace: true });
  };

  return (
    <div>
      <List title={'계정 관리'}>
        <List.Item onClick={handleLogout}> 로그아웃 </List.Item>
      </List>
      <List title={'앱 정보'}>
        <List.Item
          onClick={() => {
            navigate(PATH.POLICY);
          }}
        >
          개인정보처리방침
        </List.Item>
      </List>
    </div>
  );
};

export default SettingPage;
