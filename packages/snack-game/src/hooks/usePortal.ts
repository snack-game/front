import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const usePortal = (id: string) => {
  const rootElemRef = useRef(document.createElement('div'));

  useEffect(() => {
    const parentElem = document.querySelector(`#${id}`);
    parentElem?.appendChild(rootElemRef.current);

    return function cleanup() {
      rootElemRef.current.remove();
    };
  }, [id]);

  return createPortal;
};

export default usePortal;
