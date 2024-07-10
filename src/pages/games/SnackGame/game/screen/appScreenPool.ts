import { AppScreen, AppScreenConstructor } from './appScreen';

export class AppScreenPool {
  public readonly initializers: Map<AppScreenConstructor, () => AppScreen> =
    new Map();
  public readonly instances: Map<AppScreenConstructor, AppScreen> = new Map();

  public insert(...initializers: [AppScreenConstructor, () => AppScreen][]) {
    initializers.forEach(([ctor, initializer]) => {
      this.initializers.set(ctor, initializer);
    });
  }

  public get(ctor: AppScreenConstructor): AppScreen {
    const instance = this.instances.get(ctor);
    if (instance) {
      return instance;
    }
    const initializer = this.initializers.get(ctor);
    if (initializer) {
      const newInstance = initializer();
      this.instances.set(ctor, newInstance);
      return newInstance;
    }
    throw Error(`${ctor.name} 인스턴스가 초기화되지 않았습니다`);
  }
}
