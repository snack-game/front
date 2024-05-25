import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    i18n.changeLanguage(e.target.value);
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
