import { useTranslation } from 'react-i18next';

import { useTheme } from '@emotion/react';

import Menu from '@components/common/Menu/Menu';
import { DropDownItem } from '@components/common/Menu/Menu.style';

const LangSelect = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const languageCode = i18n.language.slice(3);

  return (
    <Menu buttonContent={languageCode} color={theme.colors.orange}>
      <DropDownItem onClick={() => i18n.changeLanguage('ko-KR')}>
        한국어
      </DropDownItem>
      <DropDownItem onClick={() => i18n.changeLanguage('en-US')}>
        English
      </DropDownItem>
    </Menu>
  );
};

export default LangSelect;
