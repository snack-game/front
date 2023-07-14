import { FC } from 'react';

import Loading from '@components/common/Loading';

import { useGetGroupsNames } from '@hooks/queries/groups.query';
import useDebounce from '@hooks/useDebounce';

import * as Styled from './SearchResultList.style';

interface SearchResultListProps {
  value: string;
  onClick: (value: string) => void;
}

const SearchResultList: FC<SearchResultListProps> = ({ value, onClick }) => {
  const debouncedValue = useDebounce({ target: value, delay: 500 });
  const { isLoading, data } = useGetGroupsNames({
    startWidth: debouncedValue,
    enabled: !!debouncedValue,
  });

  const groupList = data?.data ?? [];

  return (
    <>
      {debouncedValue.length !== 0 && (
        <Styled.Ul>
          {isLoading ? (
            <Loading type={'component'}></Loading>
          ) : (
            <>
              {groupList.length === 0 ? (
                <Styled.Li>
                  일치하는 그룹이 없어요!
                  <br />
                  새로운 그룹으로 생성할게요!
                </Styled.Li>
              ) : (
                groupList.map((item) => (
                  <Styled.Li key={item} onClick={() => onClick(item)}>
                    {item}
                  </Styled.Li>
                ))
              )}
            </>
          )}
        </Styled.Ul>
      )}
    </>
  );
};

export default SearchResultList;
