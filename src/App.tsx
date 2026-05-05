import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App as AntApp, ConfigProvider, theme, Spin } from 'antd';
import { store } from '@/app/store';
import { useAppSelector } from '@/app/hooks';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AppLayout from '@/components/layout/AppLayout';
import ProductListPage from '@/pages/ProductListPage';
import NotFoundPage from '@/pages/NotFoundPage';
import { ROUTES } from '@/constants';

const SendProductPage = lazy(() => import('@/pages/SendProductPage'));

const suspenseFallback = (
  <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
    <Spin size="large" />
  </div>
);

function AppContent() {
  const currentTheme = useAppSelector((state) => state.ui.theme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        cssVar: true,
        token: {
          colorPrimary: '#7c3aed',
        },
      }}
    >
      <AntApp>
        <BrowserRouter>
          <AppLayout>
            <ErrorBoundary>
              <Routes>
                <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.PRODUCTS} replace />} />
                <Route path={ROUTES.PRODUCTS} element={<ProductListPage />} />
                <Route
                  path={ROUTES.SEND}
                  element={
                    <Suspense fallback={suspenseFallback}>
                      <SendProductPage />
                    </Suspense>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ErrorBoundary>
          </AppLayout>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </Provider>
  );
}
