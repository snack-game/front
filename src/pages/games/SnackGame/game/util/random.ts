/**
 * 지정된 범위 내에서 무작위 수를 반환합니다
 * @param min - 최소 숫자 (포함)
 * @param max - 최대 숫자 (미포함)
 * @param random - 사용할 무작위 함수 (기본값은 Math.random)
 */
export function randomRange(
  min: number,
  max: number,
  random = Math.random,
): number {
  const a = Math.min(min, max);
  const b = Math.max(min, max);

  const v = a + (b - a) * random();

  return v;
}
