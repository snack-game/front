import { ReactNode } from 'react';

import { css, useTheme } from '@emotion/react';

import Button from '@components/common/Button/Button';
import {
  DropDownContainer,
  SideBarContainer,
} from '@components/common/Menu/Menu.style';

interface MenuProps {
  buttonContent?: string;
  children: ReactNode;
  color?: string;
}

const Menu = ({ buttonContent, children, color }: MenuProps) => {
  const theme = useTheme();

  return (
    <SideBarContainer>
      <Button
        content={buttonContent}
        size={'small'}
        color={!color && theme.colors.lightGreen}
        wrapper={css({ marginTop: '0.2rem' })}
      />
      <DropDownContainer>{children}</DropDownContainer>
    </SideBarContainer>
  );
};

export default Menu;
