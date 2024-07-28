import { Outlet } from "react-router";
import { Suspense } from "react";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import { ToastContainer } from "react-toastify";

export const Layout = () => {
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
};
