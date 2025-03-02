import React, { Suspense, lazy } from "react";
import { RouteConfig } from "./types/routeConfig";
import Sidebar from "../components/antd/sidebar/sidebar";

const Login = lazy(() => import("../pages/login/login"));
const Einvite = lazy(() => import("../pages/E-Invite"));
const EInviteCrud = lazy(() => import("../pages/E-InviteCrud/crud"));
const LandingPage = lazy(() => import("../pages/LadingPage"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const ContactPage = lazy(() => import("../pages/Contact"));
const AlbumPage = lazy(() => import("../pages/Gallery"));
const PhotoGallery = lazy(() => import("../pages/Gallery/photoGallery"));

const Loader = () => <div>Loading...</div>;

const routerData: RouteConfig[] = [
  {
    key: "login",
    path: "/login",
    component: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "landingPage",
    path: "/",
    component: (
      <Suspense fallback={<Loader />}>
        <LandingPage />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "einviteDetail",
    path: "/einvite/:id",
    component: (
      <Suspense fallback={<Loader />}>
        <Einvite />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "gallery",
    path: "/gallery",
    component: (
      <Suspense fallback={<Loader />}>
        <AlbumPage />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "galleryDetail",
    path: "/gallery/:id",
    component: (
      <Suspense fallback={<Loader />}>
        <PhotoGallery />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "services",
    path: "/services",
    component: (
      <Suspense fallback={<Loader />}>
        <ComingSoon />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "contact",
    path: "/contact",
    component: (
      <Suspense fallback={<Loader />}>
        <ContactPage />
      </Suspense>
    ),
    children: [],
  },
  {
    key: "einviteCrud",
    path: "/einvite_crud",
    component: (
      <Suspense fallback={<Loader />}>
        <Sidebar>
          <EInviteCrud items={[]} />
        </Sidebar>
      </Suspense>
    ),
    children: [],
  },
];

export default routerData;
