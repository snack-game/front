import { FC, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import useDebounce from '@hooks/useDebounce';

interface SearchResultListProps {
  value: string;
  onSelect: (value: string) => void;
}

const test = (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['홍천', '홍천고등학교', '홍천중학교']);
    }, 500);
  });
};

const SearchResultList: FC<SearchResultListProps> = ({ value, onSelect }) => {
  const [groupList, setGroupList] = useState<string[]>([]);
  const debouncedValue = useDebounce({ target: value, delay: 200 });

  useEffect(() => {
    const fetchData = async () => {
      if (value !== '') {
        const result = await test();
        setGroupList(result);
      }
    };

    fetchData();
  }, [debouncedValue]);

  return (
    <div>
      <ul>
        {value &&
          groupList.map((item) => (
            <li key={item} onClick={() => onSelect(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchResultList;

const Wrapper = styled.div``;
