/** 코드를 일정 시간 동안 일시 중지, 단위: 초 */
export function waitFor(delayInSecs = 1): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delayInSecs * 1000);
  });
}
