import EditIcon from '@assets/icon/edit.svg?react';
import DefaultImage from '@assets/images/kakao.png';
import Button from '@components/Button/Button';

interface ProfileProps {
  // 프로필 정보 속성 추가 예정
  isEditing: boolean;
  onClickEdit: () => void;
  onClickDone: () => void;
  onClickClose: () => void;
}

const Profile = ({
  isEditing,
  onClickEdit,
  onClickDone,
  onClickClose,
}: ProfileProps) => {
  return (
    <div className={`absolute top-32 flex flex-col items-center`}>
      <div className="relative">
        <div className={`h-44 w-44 rounded-full bg-rose-200`}></div>
        <img
          className={`absolute left-2 top-2 mb-4 w-40 rounded-full`}
          src={DefaultImage}
        />
        {!isEditing && (
          <button
            className={`absolute right-2 top-32 h-8 w-8 rounded-full border bg-white`}
            onClick={onClickEdit}
          >
            <EditIcon className="mx-auto" />
          </button>
        )}
      </div>

      <span className={`text-2xl`}>레벨</span>
      {isEditing ? (
        <>
          <div className="my-10 flex flex-col items-end gap-y-4">
            <label>
              팀 이름
              <input
                className={`ml-2 rounded-lg border border-primary bg-transparent focus:outline-none`}
              />
            </label>
            <label>
              유저 이름
              <input
                className={`ml-2 rounded-lg border border-primary bg-transparent focus:outline-none`}
              />
            </label>
          </div>

          <div className={`flex gap-2`}>
            <Button
              onClick={onClickClose}
              style={`border`}
              className={`hover:bg-white hover:text-slate-950`}
            >
              닫기
            </Button>
            <Button onClick={onClickDone} className="bg-[#22C55E]">
              확인
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className={`text-lg`}>팀 이름</span>
          <span className={`text-xl`}>유저 이름</span>
        </>
      )}
    </div>
  );
};

export default Profile;
