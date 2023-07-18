import { useState } from 'react';

interface useLocalStorageProps<T> {
  key: string;
  initialValue?: T;
}

const useLocalStorage = <T>({ key, initialValue }: useLocalStorageProps<T>) => {
  const [storageValue, setStorage] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setStorageValue = (value: T) => {
    setStorage(() => value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const deleteStorageValue = () => {
    localStorage.removeItem(key);
  };

  return { storageValue, setStorageValue, deleteStorageValue };
};

export default useLocalStorage;
