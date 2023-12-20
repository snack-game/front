import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

import QueryBoundary from '@components/base/QueryBoundary';
import Button from '@components/common/Button/Button';
import RetryError from '@components/common/Error/RetryError';
import Input from '@components/common/Input/Input';
import SearchResultList from '@components/ui/SearchResultList/SearchResultList';
import { userState } from '@utils/atoms/member.atom';

import { GROUP_CHANGE_REGEXP, NAME_REGEXP } from '@constants/regexp.constant';
import { useChangeGroupName } from '@hooks/queries/groups.query';
import { useChangeUserName } from '@hooks/queries/members.query';
import { useGetUserRanking } from '@hooks/queries/ranking.query';
import useInput from '@hooks/useInput';

const UserInfo = () => {
  const { t } = useTranslation();
  const changeUserName = useChangeUserName();
  const changeGroupName = useChangeGroupName();

  const [modifying, setModifying] = useState(false);
  const userRanking = useGetUserRanking();

  const [userStateValue, setUserState] = useRecoilState(userState);

  const {
    value: nameValue,
    handleChangeValue: nameValueChange,
    valid: nameValid,
  } = useInput({
    initialValue: '',
    isInvalid: (value) => NAME_REGEXP.test(value),
  });

  const {
    value: groupValue,
    handleChangeValue: groupValueChange,
    valid: groupValid,
    setFieldValue,
  } = useInput({
    initialValue: '',
    isInvalid: (value) => GROUP_CHANGE_REGEXP.test(value),
  });

  const handleChangeUserName = async () => {
    await changeUserName.mutateAsync(nameValue);
    setUserState((prev) => ({
      ...prev,
      member: {
        ...prev.member,
        name: nameValue,
      },
    }));
    setModifying(!modifying);
  };

  const handleChangeUserGroup = async () => {
    await changeGroupName.mutateAsync(groupValue);
    setUserState((prev) => ({
      ...prev,
      member: {
        ...prev.member,
        group: {
          name: groupValue,
        },
      },
    }));
    setModifying(!modifying);
  };

  return (
    <>
      <UserInfoContainer>
        {modifying ? (
          <QueryBoundary errorFallback={RetryError}>
            <h1>수정</h1>
            <InfoContainer>
              <Input
                placeholder={t('name')}
                type={'text'}
                value={nameValue}
                onChange={nameValueChange}
                errorMessage={t('login_desc')}
                required={true}
                valid={nameValid}
              />
              <Button
                content={t('save')}
                disabled={!nameValid}
                onClick={handleChangeUserName}
              />
              <Input
                placeholder={t('group')}
                type={'text'}
                value={groupValue}
                onChange={groupValueChange}
                errorMessage={t('login_desc')}
                required={true}
                valid={groupValid}
              />
              <QueryBoundary errorFallback={RetryError}>
                <SearchResultList
                  value={groupValue}
                  onClick={setFieldValue}
                  message={t('group_no_match')}
                />
              </QueryBoundary>
              <Button
                content={t('save')}
                disabled={!groupValid}
                onClick={handleChangeUserGroup}
              />
            </InfoContainer>
          </QueryBoundary>
        ) : (
          <>
            <h1>{t('my_info_title')}</h1>
            <InfoContainer>
              <p>
                {t('name')}: {userStateValue.member.name}
              </p>
              <p>
                {t('group')}:{' '}
                {userStateValue.member.group
                  ? userStateValue.member.group.name
                  : t('group_none')}
              </p>
              {userRanking && (
                <>
                  <p>
                    {t('rank_title')}: {userRanking.rank}
                    {t('rank')}
                  </p>
                  <p>
                    {t('my_info_score')}: {userRanking.score}
                    {t('game_score')}!
                  </p>
                </>
              )}
            </InfoContainer>
            <Button
              content={t('modify')}
              onClick={() => setModifying(!modifying)}
            />
          </>
        )}
      </UserInfoContainer>
    </>
  );
};

const UserInfoContainer = styled.div`
  width: 40%;
  margin: auto;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.orange};
  background-color: ${(props) => props.theme.colors.background};
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  padding: 1.5rem;

  @media (max-width: 768px) {
    width: 90%;
  }

  & > h1 {
    text-align: center;
    font-size: 2rem;
    margin: 2rem 0;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export default UserInfo;
