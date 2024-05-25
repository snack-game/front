/**
 * Simple local storage utility that can safely get/set number, boolean and object values too
 * not only string as in plain localStorage.
 */
class StorageWrapper {
  /** Get a string value from storage */
  public getString(key: string) {
    return localStorage.getItem(key) ?? undefined;
  }

  /** Set a string value to storage */
  public setString(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  /** Get a number value from storage or undefined if value can't be converted */
  public getNumber(key: string) {
    const str = this.getString(key) ?? undefined;
    const value = Number(str);
    return isNaN(value) ? null : value;
  }

  /** Set a number value to storage */
  public setNumber(key: string, value: number) {
    this.setString(key, String(value));
  }
}

export const storage = new StorageWrapper();
