import { PersistedStateOptions } from 'pinia-plugin-persistedstate';
// https://github.com/prazdevs/pinia-plugin-persistedstate

const piniaPersistConfig = (key: string) => {
  // storage,key 配置
  // https://prazdevs.github.io/pinia-plugin-persistedstate/guide/config.html
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage,
  };
  return persist;
};

export default piniaPersistConfig;
