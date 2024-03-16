import Input from '@components/Input/Input';
import Spacing from '@components/Spacing/Spacing';

import { useInputResult } from '@hooks/useInput';

interface EditInfoProps {
  newName: useInputResult<string>;
  newGroup: useInputResult<string>;
  groupSearchResult: string[] | undefined;
  onClickClose: () => void;
  onClickDone: () => void;
}

const EditInfo = ({
  newName,
  newGroup,
  groupSearchResult,
  onClickClose,
  onClickDone,
}: EditInfoProps) => {
  return (
    <>
      <div className={'my-10'}>
        <Input
          fieldLabel={'이름'}
          value={newName.value}
          onChange={newName.handleChangeValue}
          valid={newName.valid}
          errorMessage={'이름은 2글자 이상, 특수문자를 포함하지 않아야 해요.'}
        />
        <Spacing size={1} />
        <Input
          fieldLabel={'그룹'}
          value={newGroup.value}
          onChange={newGroup.handleChangeValue}
          list={'group-list'}
          valid={newGroup.valid}
          errorMessage={'그룹은 2글자 이상, 특수문자를 포함하지 않아야 해요.'}
        />
        {groupSearchResult && (
          <datalist id={'group-list'}>
            {groupSearchResult.map((candidate) => (
              <option
                className={
                  'cursor-pointer rounded-lg px-2 py-1 hover:bg-slate-100'
                }
                key={candidate}
                value={candidate}
                onClick={() => {
                  newGroup.setFieldValue(candidate);
                }}
              ></option>
            ))}
          </datalist>
        )}
      </div>

      <div className={'flex gap-2'}>
        <button
          onClick={onClickClose}
          className={
            'rounded-md border bg-white px-4 py-1 hover:bg-white hover:text-black '
          }
        >
          닫기
        </button>
        <button
          disabled={!newName.valid || !newGroup.valid}
          onClick={onClickDone}
          className={
            'rounded-md bg-button-enabled px-4 py-1 text-white disabled:cursor-not-allowed disabled:bg-button-disabled disabled:opacity-100'
          }
        >
          확인
        </button>
      </div>
    </>
  );
};

export default EditInfo;
