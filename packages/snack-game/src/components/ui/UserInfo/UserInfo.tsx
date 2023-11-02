import React, { useState } from 'react';

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
    setUserState((prev) => ({ ...prev, name: nameValue }));
    setModifying(!modifying);
  };

  const handleChangeUserGroup = async () => {
    await changeGroupName.mutateAsync(groupValue);
    setUserState((prev) => ({ ...prev, group: { name: groupValue } }));
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
                placeholder={'이름'}
                type={'text'}
                value={nameValue}
                onChange={nameValueChange}
                errorMessage={
                  '이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.'
                }
                required={true}
                valid={nameValid}
              />
              <Button
                content={'저장'}
                disabled={!nameValid}
                onClick={handleChangeUserName}
              />
              <Input
                placeholder={'그룹'}
                type={'text'}
                value={groupValue}
                onChange={groupValueChange}
                errorMessage={
                  '그룹은 2글자 이상, 특수문자를 포함하지 않아야 해요.'
                }
                required={true}
                valid={groupValid}
              />
              <QueryBoundary errorFallback={RetryError}>
                <SearchResultList
                  value={groupValue}
                  onClick={setFieldValue}
                  message={'일치하는 그룹이 없어요! 새로 만들어 보아요!'}
                />
              </QueryBoundary>
              <Button
                content={'저장'}
                disabled={!groupValid}
                onClick={handleChangeUserGroup}
              />
            </InfoContainer>
          </QueryBoundary>
        ) : (
          <>
            <h1>내 정보</h1>
            <InfoContainer>
              <p>이름: {userStateValue.name}</p>
              <p>
                그룹:
                {userStateValue.group ? userStateValue.group.name : '없음'}
              </p>
              {userRanking && (
                <>
                  <p>랭킹: {userRanking.ranking}등</p>
                  <p>최고 점수: {userRanking.score}점!</p>
                </>
              )}
            </InfoContainer>
            <Button content={'수정'} onClick={() => setModifying(!modifying)} />
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
  border: 1px solid;
  border-radius: 1rem;
  border-color: ${(props) => props.theme.colors.orange};
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
