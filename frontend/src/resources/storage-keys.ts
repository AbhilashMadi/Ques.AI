
const StorageKeys = {
  APP_THEME: 'aues_ai-theme',
  COLLSPED: 'collapsed',
} as const;

type StorageKeys = typeof StorageKeys[keyof typeof StorageKeys];
export default StorageKeys;