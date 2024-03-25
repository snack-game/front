import { useSetRecoilState } from 'recoil';

import { modalState } from '@utils/atoms/common.atom';
import { ModalType } from '@utils/types/common.type';

const useModal = () => {
  const setModalState = useSetRecoilState(modalState);

  const openModal = ({ children, handleOutsideClick }: ModalType) => {
    setModalState(() => ({
      children,
      open: true,
      handleOutsideClick,
    }));
  };

  const closeModal = () => {
    setModalState(() => ({
      open: false,
      handleOutsideClick: undefined,
    }));
  };

  return { openModal, closeModal };
};

export default useModal;
