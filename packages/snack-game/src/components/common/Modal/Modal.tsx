import useModal from '@hooks/useModal';

const Modal = () => {
  const { toggleModal, isShowing } = useModal();

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      {isShowing && (
        <div
          css={{
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '10',
          }}
        ></div>
      )}
    </>
  );
};
