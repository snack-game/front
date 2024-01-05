import { HTMLAttributes, memo } from 'react';

type Direction = 'horizontal' | 'vertical';

interface SpacingProps extends HTMLAttributes<HTMLDivElement> {
  direction?: Direction;
  size: number;
}

export default memo(function Spacing({
  size,
  direction = 'vertical',
  ...props
}: SpacingProps) {
  return (
    <div
      style={{
        [direction === 'vertical' ? 'height' : 'width']: size + 'rem',
      }}
      {...props}
    />
  );
});
