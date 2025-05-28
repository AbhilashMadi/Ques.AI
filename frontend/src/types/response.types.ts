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