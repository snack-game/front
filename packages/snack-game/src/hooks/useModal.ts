import { useSetRecoilState } from 'recoil';

import { modalState } from '@utils/atoms/common.atom';
import { ModalType } from '@utils/types/common.type';

const useModal = () => {
  const setModalState = useSetRecoilState(modalState);

  const openModal = ({ children }: ModalType) => {
    setModalState(() => ({
      children,
      open: true,
    }));
  };

  const closeModal = () => {
    setModalState(() => ({
      open: false,
    }));
  };

  return { openModal, closeModal };
};

export default useModal;
