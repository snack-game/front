import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE_KEY } from '@constants/localStorage.constant';
import useLocalStorage from '@hooks/useLocalStorage';

const LanguageSelect = () => {
  const { t, i18n } = useTranslation('setting');
  const { setStorageValue } = useLocalStorage<boolean>({
    key: LOCAL_STORAGE_KEY.LANGUAGE_CHANGE,
  });

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    i18n.changeLanguage(e.target.value);
    setStorageValue(true);
  };

  return (
    <div className="border">
      <select
        name="language"
        className="w-16 bg-transparent"
        onChange={handleChange}
        defaultValue={i18n.language}
      >
        <option value="ko">{t('ko')}</option>
        <option value="en-US">{t('en')}</option>
      </select>
    </div>
  );
};

export default LanguageSelect;
