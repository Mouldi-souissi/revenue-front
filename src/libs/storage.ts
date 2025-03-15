export class Storage {
  private static instance: Storage;
  private storage: StorageInterface;

  private constructor(storage: StorageInterface) {
    this.storage = storage;
  }

  public static getInstance(storage: StorageInterface = localStorage): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage(storage);
    }
    return Storage.instance;
  }

  getItem<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (e) {
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

export interface StorageInterface {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

const storage = Storage.getInstance(localStorage);
export default storage;
