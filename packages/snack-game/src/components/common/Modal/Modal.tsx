import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';

import { modalState } from '@utils/atoms/modal.atom';

import useModal from '@hooks/useModal';

import * as Styled from './Modal.style';

const Modal = () => {
  const { title, description, open, children } = useRecoilValue(modalState);

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
        <Styled.Modal onClick={closeModal}>
          <Styled.ModalContainer onClick={(event) => event.stopPropagation()}>
            <h2>{title}</h2>
            {children}
          </Styled.ModalContainer>
        </Styled.Modal>
      )}
    </>
  );
};

export default Modal;
