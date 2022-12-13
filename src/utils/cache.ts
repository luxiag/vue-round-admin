// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export interface StorageParams {
  prefixKey: string;
  storage: Storage;
}

export const createStorage = ({
  prefixKey = '',
  storage = localStorage,
}: Partial<StorageParams> = {}) => {
  const WebStorage = class WebStorage {
    private readonly storage = storage;
    private readonly prefixKey: string = prefixKey;

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    //
    set(key: string, value: any, expire: number | null = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });

      this.storage.setItem(this.getKey(key), stringData);
    }

    get(key: string, def: any = null): any {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          if (expire === null || expire >= Date.now()) {
            return value;
          }
          this.remove(this.getKey(key));
        } catch (e) {
          return def;
        }
      }
      return def;
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};

export const WebStorage = createStorage();

export default WebStorage;
