import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';

import { modalState } from '@utils/atoms/common.atom';

import useModal from '@hooks/useModal';

const Modal = () => {
  const { open, children, handleOutsideClick } = useRecoilValue(modalState);

  const { closeModal } = useModal();

  const handleClose = () => {
    closeModal();
    if (handleOutsideClick) handleOutsideClick();
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
        <div
          className={'fixed top-0 z-50 h-screen w-screen bg-gray-500/50'}
          onClick={handleClose}
        >
          <motion.div
            className={
              'absolute left-1/2 top-1/2 h-1/2 w-[80%] min-w-fit rounded-xl bg-white p-10 shadow-md lg:max-h-[600px] lg:w-1/4 lg:max-w-[400px]'
            }
            onClick={(event) => event.stopPropagation()}
            initial={{ y: 10, opacity: 0, x: '-50%' }}
            whileInView={{ y: '-50%', opacity: 1 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Modal;
