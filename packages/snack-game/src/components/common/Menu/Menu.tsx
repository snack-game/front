import { ReactNode } from 'react';

import { css } from '@emotion/react';

import Button from '@components/common/Button/Button';
import {
  DropDownContainer,
  SideBarContainer,
} from '@components/common/Menu/Menu.style';
import theme from '@utils/theme';

interface MenuProps {
  buttonContent: string;
  children: ReactNode;
}

const Menu = ({ buttonContent, children }: MenuProps) => {
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
