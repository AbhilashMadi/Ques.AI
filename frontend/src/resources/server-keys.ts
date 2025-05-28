
const ServerKeys = {
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  REMEMBER: 'remember',
  FULL_NAME: 'fullName',
  TITLE: 'title',
  DESCRIPTION: 'description',
  PROJECT_ID: 'projectId',
  TRANSCRIPT_NAME: 'transcriptName',
  TRANSCRIPT: 'transcript',
  TRNASCRIPT_CATEGORY: 'transcriptCategory',
  ROLE: 'role',
  IS_VERIFIED: 'isVerified',
  ACTIVE: 'active',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  USER_ID: 'userId',
  STATUS_CODE: 'statusCode',
  ERROR: 'error',
  MESSAGE: 'message',
  STATUS: 'status',
  LIST: 'list',
  PAGINATION: 'pagination',
  TOTAL: 'total',
  PAGE: 'page',
  LIMIT: 'limit',
  PAGES: 'pages',
} as const;

type ServerKeys = typeof ServerKeys[keyof typeof ServerKeys];
export default ServerKeys;