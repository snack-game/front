import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import Spacing from '@components/Spacing/Spacing';

import { useGetGroupsNames } from '@hooks/queries/groups.query';
import useDebounce from '@hooks/useDebounce';
import { useInputResult } from '@hooks/useInput';

interface EditInfoProps {
  newName: useInputResult<string>;
  newGroup: useInputResult<string>;
  onClickClose: () => void;
  onClickDone: () => void;
}

const EditInfo = ({
  newName,
  newGroup,
  onClickClose,
  onClickDone,
}: EditInfoProps) => {
  const debounceValue = useDebounce({
    target: newGroup.value,
    delay: 300,
  });

  const { data: groupSearchResult } = useGetGroupsNames({
    startWidth: debounceValue,
    enabled: !!debounceValue,
  });

  return (
    <>
      <Spacing size={4} />
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
        dataListId={'group-list'}
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
      <Spacing size={2} />

      <div className={'flex gap-6'}>
        <Button
          onClick={onClickClose}
          className={'border bg-white hover:bg-white hover:text-black '}
          style="border"
          size="lg"
        >
          닫기
        </Button>
        <Button
          disabled={!newName.valid || !newGroup.valid}
          onClick={onClickDone}
          className={
            'bg-button-enabled disabled:bg-button-disabled disabled:opacity-100'
          }
          size="lg"
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default EditInfo;
