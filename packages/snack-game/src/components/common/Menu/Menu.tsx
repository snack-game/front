import { ReactNode } from 'react';

import { css, useTheme } from '@emotion/react';

import Button from '@components/common/Button/Button';
import {
  DropDownContainer,
  SideBarContainer,
} from '@components/common/Menu/Menu.style';

interface MenuProps {
  buttonContent: string;
  children: ReactNode;
}

const Menu = ({ buttonContent, children }: MenuProps) => {
  const theme = useTheme();

  return (
    <SideBarContainer>
      <Button
        content={buttonContent}
        size={'small'}
        color={theme.colors.lightGreen}
        wrapper={css({ margin: '0.2rem' })}
      />
      <DropDownContainer>{children}</DropDownContainer>
    </SideBarContainer>
  );
};

export default Menu;
