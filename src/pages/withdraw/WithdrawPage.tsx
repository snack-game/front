import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useResetRecoilState } from 'recoil';

import Button from '@components/Button/Button';
import TopBar from '@components/TopBar/TopBar';
import { resetUserState } from '@utils/atoms/member.atom';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import PATH from '@constants/path.constant';
import { useDeleteMember } from '@hooks/queries/members.query';
import useLocalStorage from '@hooks/useLocalStorage';
import useToast from '@hooks/useToast';

const warningTextKey = ['ranking_deleted', 'history_deleted', 'level_reset'];

const WithdrawPage = () => {
  const [checked, setChecked] = useState(false);

  const resetUser = useResetRecoilState(resetUserState); // TODO: user / member 표현 통일하기
  const withdrawMember = useDeleteMember();

  const navigate = useNavigate();
  const openToast = useToast();
  const { t } = useTranslation('withdraw');
  const { deleteStorageValue } = useLocalStorage({
    key: LOCAL_STORAGE_KEY.USER_EXPIRE_TIME,
  });

  const handleWithdraw = async () => {
    resetUser();
    await withdrawMember.mutateAsync();
    openToast(t('withdraw_success'), 'success');
    deleteStorageValue();
    window.dispatchEvent(new Event('loggedOut'));
    navigate(PATH.MAIN, { replace: true }); // TODO: #281 이후 게임 페이지로 이동하도록 수정
  };

  return (
    <>
      <Helmet>
        <title>Snack Game || Withdraw</title>
      </Helmet>

      <div className="flex h-screen flex-col items-center py-5">
        <TopBar title={t('withdraw')} backUrl={PATH.SETTING} />

        <div className="flex flex-1 flex-col justify-between px-4 sm:w-3/5">
          <div className="flex flex-col gap-4">
            <p className="text-center text-2xl font-bold">{t('notice')}</p>
            <div className="text-md flex w-full gap-2 border-l-4 border-primary bg-primary bg-opacity-20 px-2 py-3">
              <p>⚠️</p>
              <p className="break-keep pr-12 sm:pr-2">{t('warning')}</p>
            </div>
            {warningTextKey.map((localeKey) => (
              <div
                key={localeKey}
                className="text-md w-full rounded-md border border-primary border-opacity-80 p-2"
              >
                {t(localeKey)}
              </div>
            ))}
          </div>

          <div>
            <label className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                className="h-5 w-5"
                onChange={(event) => setChecked(event.target.checked)}
              />
              {t('agree_with_notice')}
            </label>
            <Button
              size="lg"
              className="mt-4 w-full"
              disabled={!checked}
              onClick={handleWithdraw}
            >
              {t('withdraw_confirm')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawPage;
