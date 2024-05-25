import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
        fieldLabel={t('name')}
        value={newName.value}
        onChange={newName.handleChangeValue}
        valid={newName.valid}
        errorMessage={t('user_edit_error_message')}
      />
      <Spacing size={1} />
      <Input
        fieldLabel={t('group')}
        value={newGroup.value}
        onChange={newGroup.handleChangeValue}
        dataListId={'group-list'}
        valid={newGroup.valid}
        errorMessage={t('user_edit_error_message')}
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
          {t('close')}
        </Button>
        <Button
          disabled={!newName.valid || !newGroup.valid}
          onClick={onClickDone}
          className={
            'bg-button-enabled disabled:bg-button-disabled disabled:opacity-100'
          }
          size="lg"
        >
          {t('submit')}
        </Button>
      </div>
    </>
  );
};

export default EditInfo;
