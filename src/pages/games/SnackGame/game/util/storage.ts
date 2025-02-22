/**
 * 문자열뿐만 아니라 숫자값을  안전하게 가져오고 설정할 수 있는 간단한 로컬 저장소 유틸리티.
 */
class StorageWrapper {
  /** 저장소에서 문자열 값을 가져옵니다. */
  public getString(key: string) {
    return localStorage.getItem(key) ?? undefined;
  }

  /** 저장소에 문자열 값을 설정합니다. */
  public setString(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /** 저장소에서 숫자 값을 가져오거나 값을 변환할 수 없는 경우 undefined를 반환합니다. */
  public getNumber(key: string) {
    const str = this.getString(key) ?? undefined;
    const value = Number(str);
    return isNaN(value) ? null : value;
  }

  /** 저장소에 숫자 값을 설정합니다. */
  public setNumber(key: string, value: number) {
    this.setString(key, String(value));
  }

  /** 저장소에서 Object 값을 가져오거나 값을 가져올 수 없는 경우 undefined를 반환합니다. */
  public getObject(key: string) {
    const str = this.getString(key);
    if (!str) return undefined;
    try {
      return JSON.parse(str);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }

  /** 저장소에 Object값을 저장합니다. */
  public setObject(key: string, value: Record<string, unknown>) {
    this.setString(key, JSON.stringify(value));
  }

  /** 저장소에 Boolean 값을 설정합니다. */
  public setBoolean(key: string, value: boolean) {
    this.setString(key, String(value));
  }

  /** 저장소에서 Boolean 값을 가져오거나, 값을 가져올 수 없는 경우 undefined를 반환합니다. */
  public getBoolean(key: string) {
    const str = this.getString(key);
    if (!str) return undefined;
    return str === 'true';
  }
}

export const storage = new StorageWrapper();
