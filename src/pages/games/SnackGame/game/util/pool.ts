/**
 * 특정 클래스의 인스턴스를 재사용하기 위해 풀링합니다.
 */
class Pool<T extends new () => InstanceType<T> = new () => any> {
  constructor(
    private readonly ctor: T,
    private readonly list: InstanceType<T>[] = [],
  ) {}

  /** 풀에서 유휴 인스턴스를 가져오거나, 사용 가능한 인스턴스가 없다면 새로운 인스턴스를 생성합니다 */
  public get() {
    return this.list.pop() ?? new this.ctor();
  }

  /** 인스턴스를 풀에 반환하여 재사용할 수 있도록 합니다 */
  public giveBack(item: InstanceType<T>) {
    if (this.list.includes(item)) return;
    this.list.push(item);
  }
}

/**
 * 모든 클래스의 인스턴스를 관리하는 내부 풀을 조직화합니다.
 */
export class MultiPool {
  /** 클래스별 풀 맵 */
  public readonly map: Map<new () => any, Pool> = new Map();

  /** 주어진 클래스의 유휴 인스턴스를 가져오거나, 사용 가능한 인스턴스가 없다면 새로운 인스턴스를 생성합니다 */
  public get<T extends new () => InstanceType<T>>(ctor: T): InstanceType<T> {
    let pool = this.map.get(ctor);
    if (!pool) {
      pool = new Pool(ctor);
      this.map.set(ctor, pool);
    }
    return pool.get();
  }

  /** 인스턴스를 해당 풀에 반환하여 재사용할 수 있도록 합니다 */
  public giveBack(item: InstanceType<any>) {
    const pool = this.map.get(item.constructor);
    if (pool) pool.giveBack(item);
  }
}

export const pool = new MultiPool();
