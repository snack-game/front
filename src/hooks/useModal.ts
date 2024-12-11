import { useSetRecoilState } from 'recoil';

import { modalState } from '@utils/atoms/common.atom';
import { ModalType } from '@utils/types/common.type';

const useModal = () => {
  const setModalState = useSetRecoilState(modalState);

  const openModal = ({ children, onClose }: ModalType) => {
    setModalState(() => ({
      children,
      open: true,
      onClose,
    }));
  };

  const closeModal = () => {
    setModalState(() => ({
      open: false,
      onClose: undefined,
    }));
  };

  return { openModal, closeModal };
};

export default useModal;
