import EditIcon from '@assets/icon/edit.svg?react';
import DefaultImage from '@assets/images/kakao.png';

const Profile = () => {
  return (
    <div className={`absolute top-32 flex flex-col items-center`}>
      <div>
        <div className={`h-44 w-44 rounded-full bg-rose-200`}></div>
        <img
          className={`absolute left-2 top-2 mb-4 w-40 rounded-full`}
          src={DefaultImage}
        />
        <button
          className={`absolute right-2 top-32 h-8 w-8 rounded-full border bg-white`}
        >
          <EditIcon className="mx-auto" />
        </button>
      </div>
      <span className={`text-2xl`}>레벨</span>
      <span className={`text-lg`}>팀 이름</span>
      <span className={`text-xl`}>유저 이름</span>
    </div>
  );
};

export default Profile;
