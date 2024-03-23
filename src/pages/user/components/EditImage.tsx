import CameraIcon from '@assets/icon/camera.svg?react';
import EditIcon from '@assets/icon/edit.svg?react';

interface EditImageProps {
  isEditing: boolean;
  onClickEdit: () => void;
  onChangeFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditImage = ({
  isEditing,
  onClickEdit,
  onChangeFile,
}: EditImageProps) => {
  if (isEditing) {
    return (
      <label
        className={`absolute left-2 top-2 h-40 w-40 cursor-pointer rounded-full bg-black bg-opacity-50`}
      >
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={onChangeFile}
        />
        <CameraIcon className="mx-auto h-full" />
      </label>
    );
  }
  return (
    <button
      className={'absolute right-2 top-32 h-8 w-8 rounded-full border bg-white'}
      onClick={onClickEdit}
    >
      <EditIcon className={'mx-auto'} />
    </button>
  );
};

export default EditImage;
