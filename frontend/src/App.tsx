import { SitePaths } from '@configs/site-config';
import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@components/common/loader';

// Context Layer
const ContextProvider = lazy(() => import('@context/provider'));

// Layouts
const PublicLayout = lazy(() => import('@components/layouts/public-layout'));
const AuthLayout = lazy(() => import('@components/layouts/auth-layout'));
const PrivateLayout = lazy(() => import('@components/layouts/private-layout'));
const ProjectDashboardLayout = lazy(() => import('@components/layouts/project-dashboard-layout'));

// Public Pages
const LoginPage = lazy(() => import('@pages/login-page'));
const RegisterPage = lazy(() => import('@pages/register-page'));
const NotFoundPage = lazy(() => import('@pages/not-found-page'));
const OtpPage = lazy(() => import('@pages/otp-page'));
const ForgotPasswordPage = lazy(() => import('@pages/forgot-password-page'));
const ResetPassword = lazy(() => import('@pages/reset-password'));

// Private Pages
const ProjectsPage = lazy(() => import('@pages/projects-page'));
const AddPodcastPage = lazy(() => import('@pages/add-podcast-page'));
const EditTranscriptPage = lazy(() => import('@pages/edit-transcript-page'));
const UserProfilePage = lazy(() => import('@pages/user-profile-page'));

function App() {
  return (
    <ContextProvider>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Public Layout */}
          <Route element={<PublicLayout />}>
            <Route path={SitePaths.AUTH} element={<AuthLayout />}>
              <Route path={SitePaths.AUTH_LOGIN.replace(`${SitePaths.AUTH}/`, '')} element={<LoginPage />} />
              <Route path={SitePaths.AUTH_REGISTER.replace(`${SitePaths.AUTH}/`, '')} element={<RegisterPage />} />
              <Route path={SitePaths.AUTH_OTP.replace(`${SitePaths.AUTH}/`, '')} element={<OtpPage />} />
              <Route path={SitePaths.AUTH_FORGOT_PASSWORD.replace(`${SitePaths.AUTH}/`, '')} element={<ForgotPasswordPage />} />
              <Route path={SitePaths.AUTH_RESET_PASSWORD.replace(`${SitePaths.AUTH}/`, '')} element={<ResetPassword />} />
            </Route>
          </Route>

          {/* Private Layout */}
          <Route element={<PrivateLayout />}>
            <Route index element={<Navigate to={SitePaths.PROJECTS} replace />} />
            <Route path={SitePaths.PROJECTS.replace('/', '')} element={<ProjectsPage />} />
            <Route path={SitePaths.PROJECT_DASHBOARD()} element={<ProjectDashboardLayout />}>
              <Route index element={<AddPodcastPage />} />
              <Route path={SitePaths.EDIT_TRANSCRIPT} element={<EditTranscriptPage />} />
              <Route path={SitePaths.USER_PROFILE} element={<UserProfilePage />} />
            </Route>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense >
    </ContextProvider>
  );
}

export default App;
