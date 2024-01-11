import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { modalState } from '@utils/atoms/common.atom';

import useModal from '@hooks/useModal';

const Modal = () => {
  const { open, children } = useRecoilValue(modalState);

  const { closeModal } = useModal();

  const handleClose = () => {
    closeModal();
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <>
      {open && (
        <div onClick={closeModal}>
          <div onClick={(event) => event.stopPropagation()}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
