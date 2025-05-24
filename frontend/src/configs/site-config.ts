export const SitePaths = {
  /* AUTH ROUTES */
  AUTH: '/auth',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_OTP: '/auth/otp',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/auth/reset-password',

  /* PRIVATE ROUTES */
  PROJECTS: '/projects',
  PROJECT_DETAILS: (projectId: string) => `/projects/${projectId}`,

  /* UPLOAD FLOW */
  ADD_PODCAST: (projectId: string) => `/projects/${projectId}/add-podcast`,
  UPLOAD_FROM_YOUTUBE: (projectId: string) => `/projects/${projectId}/add-podcast/youtube`,
  UPLOAD_FILE: (projectId: string) => `/projects/${projectId}/add-podcast/upload`,

  /* TRANSCRIPT FLOW */
  EDIT_TRANSCRIPT: (projectId: string, fileId: string) => `/projects/${projectId}/transcript/${fileId}`,
};

export const SiteConfig = {
  appName: 'Ques.AI',
  tagline: 'Your podcast will no longer be just a hobby',
  description: 'Supercharge your podcast creation using AI-powered tools for transcription, editing, and more.',
  links: {
    github: 'https://github.com/AbhilashMadi/Ques.AI.git',
    help: '/help',
    privacyPolicy: '/privacy',
    termsOfService: '/terms',
  },
};
