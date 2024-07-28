import { lazy } from "react";
import { Route, Routes } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "../shared/layouts/layout";

const Home = lazy(() => import("../pages/homePage"));
const Catalogue = lazy(() => import("../pages/cataloguePage"));
const ClubItem = lazy(() => import("../pages/clubItemPage"));
const ClubForm = lazy(() => import("../pages/clubFormPage"));
const Clients = lazy(() => import("../pages/clientsPage"));
const ClientForm = lazy(() => import("../pages/clientFormPage"));
const NotFound = lazy(() => import("../pages/notFoundPage"));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clubs" element={<Catalogue />} />
          <Route path="clubs/create" element={<ClubForm />} />
          <Route path="clubs/:id" element={<ClubItem />} />
          <Route path="clubs/:id/update" element={<ClubForm />} />
          <Route path="clubs/:id/clients" element={<Clients />} />
          <Route path="clubs/:id/clients/create" element={<ClientForm />} />
          <Route
            path="clubs/:id/clients/:clientId/update"
            element={<ClientForm />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};
