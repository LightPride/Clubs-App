import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Header } from '@components/Header';
import { Loader } from '@components/Loader';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loader />}>
          <div className="main-container">
            <Outlet />
          </div>
          <ToastContainer />
        </Suspense>
      </main>
    </>
  );
}
