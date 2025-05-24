
const ServerKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  REMEMBER: 'remember',
  PROJECT_NAME: 'projectName',
} as const;

type ServerKeys = typeof ServerKeys[keyof typeof ServerKeys];
export default ServerKeys;