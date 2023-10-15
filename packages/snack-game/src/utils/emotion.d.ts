import '@emotion/react';
import { ColorsTypes } from '@utils/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
  }
}
