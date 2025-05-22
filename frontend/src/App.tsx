import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Context Layers
const ContextProvider = lazy(() => import('@context/provider'));

// Layouts
const PublicLayout = lazy(() => import('@components/layouts/public-layout'));
const PrivateLayout = lazy(() => import('@components/layouts/private-layout'));

// Public Pages
const LoginPage = lazy(() => import('@pages/login-page'));
const RegisterPage = lazy(() => import('@pages/register-page'));
const NotFoundPage = lazy(() => import('@pages/not-found-page'));

// Private Pages
const Dashboard = lazy(() => import('@pages/dashboard'));

function App() {
  return (
    <ContextProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Private Layout */}
          <Route element={<PrivateLayout />}>
            {/* Default route for authenticated users */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ContextProvider>
  );
}

export default App;
