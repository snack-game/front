import { useSetRecoilState } from 'recoil';

import { modalState } from '@utils/atoms/modal.atom';
import { ModalType } from '@utils/types/common.type';

const useModal = () => {
  const setModalState = useSetRecoilState(modalState);

  const openModal = ({ title, description, children }: ModalType) => {
    setModalState(() => ({
      title,
      description,
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
