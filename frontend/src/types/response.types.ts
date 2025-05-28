import type ServerKeys from '@resources/server-keys'

export interface ExceptionError {
  [ServerKeys.STATUS_CODE]: number;
  [ServerKeys.ERROR]: string;
  [ServerKeys.MESSAGE]: string;
}

export interface SuccessResponse<T = unknown> {
  status: 'success';
  message: string;
  timestamp: number;
  data: T;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  timestamp: number;
  code: number;
}


export type User = {
  [ServerKeys.EMAIL]: `${string}@${string}.${string}`;
  [ServerKeys.FULL_NAME]: string;
  [ServerKeys.ROLE]: 'user' | 'admin';
  [ServerKeys.IS_VERIFIED]: boolean;
  [ServerKeys.ACTIVE]: boolean;
  [ServerKeys.CREATED_AT]: string;
  [ServerKeys.UPDATED_AT]: string;
  [ServerKeys.USER_ID]: string;
}

export type Project = {
  [ServerKeys.PROJECT_ID]: string;
  [ServerKeys.USER_ID]: string;
  [ServerKeys.STATUS]: 'active' | 'archived';
  [ServerKeys.TITLE]: string;
  [ServerKeys.DESCRIPTION]: string;
  [ServerKeys.CREATED_AT]: string;
  [ServerKeys.UPDATED_AT]: string;
}

export interface PaginatedResponse<T = unknown> {
  [ServerKeys.LIST]: T[],
  [ServerKeys.PAGINATION]: {
    [ServerKeys.TOTAL]: number,
    [ServerKeys.PAGE]: number,
    [ServerKeys.LIMIT]: number,
    [ServerKeys.PAGES]: number,
  }
}