import Loading from '@components/common/Loading/Loading';

import { useGetGroupsNames } from '@hooks/queries/groups.query';
import useDebounce from '@hooks/useDebounce';

import * as Styled from './SearchResultList.style';

interface SearchResultListProps {
  value: string;
  onClick: (value: string) => void;
  message?: string;
}

const SearchResultList = ({
  value,
  onClick,
  message = '일치하는 결과가 없어요!',
}: SearchResultListProps) => {
  const debouncedValue = useDebounce({ target: value, delay: 500 });
  const { isLoading, data } = useGetGroupsNames({
    startWidth: debouncedValue,
    enabled: !!debouncedValue,
  });

  const groupList = data ?? [];

  return (
    <>
      {debouncedValue.length !== 0 && (
        <Styled.Ul>
          {isLoading ? (
            <Loading type={'component'} />
          ) : (
            <>
              {groupList.length === 0 ? (
                <Styled.Li>{message}</Styled.Li>
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
