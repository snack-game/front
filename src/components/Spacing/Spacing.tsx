import { memo } from 'react';

type Direction = 'horizontal' | 'vertical';

interface SpacingProps {
  direction?: Direction;
  size: number;
  className?: string;
}

export default memo(function Spacing({
  size,
  direction = 'vertical',
  className,
  ...props
}: SpacingProps) {
  return (
    <div
      style={{
        [direction === 'vertical' ? 'height' : 'width']: size + 'rem',
      }}
      className={className && className}
      {...props}
    />
  );
});
