/** 코드를 일정 시간 동안 일시 중지, 단위: 초 */
export function waitFor(delayInSecs = 1): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delayInSecs * 1000);
  });
}

type AsyncQueueFn = () => Promise<void>;

/**
 * 추가된 순서대로 하나씩 실행되는 비동기 함수 목록.
 * 또한 명령어로 "js 일시 중지"를 제공하는 저렴한 방법을 제공함 - 실행 큐를 일시 중지할 수 있으며,
 * 일시 중지된 경우 큐의 다음 함수는 재개될 때까지 실행되지 않음.
 */
export class AsyncQueue {
  /** 순차적으로 실행될 비동기 함수 큐 */
  private readonly queue: AsyncQueueFn[] = [];
  /** 처리가 일시 중지되었는지 확인 */
  private paused = false;
  /** 처리가 시작되었으며 큐가 비어 있지 않은지 확인 */
  private processing = false;

  /** 실행 큐 일시 중지 */
  public pause() {
    this.paused = true;
  }

  /** 실행 큐 재개 */
  public resume() {
    this.paused = false;
  }

  /** 큐가 처리 중인지 확인 */
  public isProcessing() {
    return this.processing;
  }

  /** 실행이 일시 중지되었는지 확인 */
  public isPaused() {
    return this.processing;
  }

  /**
   * 비동기 함수를 큐의 마지막에 추가하고, 큐가 비어 있고 자동 시작이 true로 설정된 경우 즉시 실행.
   * 자동 시작이 false로 설정된 경우 `process()` 메서드를 호출하여 실행 큐를 수동으로 시작해야 함.
   * @param fn 추가할 함수.
   * @param autoStart 자동으로 큐 실행을 시작.
   */
  public async add(fn: AsyncQueueFn, autoStart = true) {
    this.queue.push(fn);
    if (autoStart) await this.process();
  }

  /** 하나씩 실행 큐를 실행하고 각 함수를 대기함. */
  public async process() {
    if (this.processing) return;
    this.processing = true;
    while (this.queue.length) {
      if (this.paused) {
        await waitFor(0.1);
      } else {
        const fn = this.queue.shift();
        if (fn) await fn();
      }
    }
    this.processing = false;
  }

  /** 처리 중지 및 큐에 남은 모든 함수 제거. */
  public clear() {
    this.queue.length = 0;
    this.processing = false;
    this.paused = false;
  }
}
