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
  [ServerKeys.PODCASTS_COUNT]: number;
}

export type UploadFile = {
  [ServerKeys.NAME]: string;
  [ServerKeys.SIZE]: number;
  [ServerKeys.MIME_TYPE]: string;
  [ServerKeys.URL]: string;
}

export type Podcast = {
  [ServerKeys.PROJECT_ID]: string;
  [ServerKeys.PODCAST_ID]: string;
  [ServerKeys.USER_ID]: string;
  [ServerKeys.NAME]: string;
  [ServerKeys.SOURCE_TYPE]: 'rss' | 'youtube' | 'upload';
  [ServerKeys.SOURCE_URL]: string;
  [ServerKeys.TRANSCRIPT]: string;
  [ServerKeys.STATUS]: 'active' | 'archived'
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

export type PodcastsListResponseType = SuccessResponse<PaginatedResponse<Podcast>>