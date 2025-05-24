
const ServerKeys = {
  PROJECT_NAME: 'projectName',
} as const;

type ServerKeys = typeof ServerKeys[keyof typeof ServerKeys];
export default ServerKeys;