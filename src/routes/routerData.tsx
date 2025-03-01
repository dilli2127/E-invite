import React, { Suspense, lazy } from "react";
import { RouteConfig } from "./types/routeConfig";
import Sidebar from "../components/antd/sidebar/sidebar";
import EAlbum from "../pages/E-Album";
import { Outlet } from "react-router-dom";
import PackageDetails from "../pages/service";
import AppHeader from "../components/Header/Header";
import PhotographyLandingPage from "../pages/Home";
import PrivacyPolicy from "../pages/policy/privacy_policy";
import TermsAndConditions from "../pages/policy/terms_and_onditions";
import ReturnAndRefundPolicy from "../pages/policy/return_and_refund_policy";
import EInvitePage from "../pages/E-Invite";

// User web imports
const Login = lazy(() => import("../pages/login/login"));
const Einvite = lazy(() => import("../pages/E-Invite"));
const LandingPage = lazy(() => import("../pages/LadingPage"));
const ContactPage = lazy(() => import("../pages/Contact"));
const AlbumPage = lazy(() => import("../pages/Gallery"));
const PhotoGallery = lazy(() => import("../pages/Gallery/photoGallery"));

// Admin imports
const EInviteCrud = lazy(() => import("../pages/E-InviteCrud/crud"));
const EGalleryCrud = lazy(() => import("../pages/E-GalleryCrud/crud"));
const EAlbumCrud = lazy(() => import("../pages/E-AlbumCrud/crud"));
const CmsImageCrud = lazy(() => import("../pages/CMS-Image-Crud/crud"));

const Loader = () => <div>Loading...</div>;

const routerData: RouteConfig[] = [
  {
    key: "login",
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
    children: [],
  },
  // user web
  {
    key: "userweb",
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <AppHeader />
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        key: "landingPage",
        path: "/",
        element: (
          <Suspense fallback={<Loader />}>
            <PhotographyLandingPage />
          </Suspense>
        ),
      },
      {
        key: "einvite",
        path: "/einvite",
        element: (
          <Suspense fallback={<Loader />}>
            <LandingPage />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "einvite",
        path: "/einvite/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EInvitePage />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "ealbum",
        path: "/ealbum",
        element: (
          <Suspense fallback={<Loader />}>
            <LandingPage />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "ealbum",
        path: "/ealbum/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <EAlbum />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "gallery",
        path: "/gallery",
        element: (
          <Suspense fallback={<Loader />}>
            <AlbumPage />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "galleryDetail",
        path: "/gallery/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <PhotoGallery />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "services",
        path: "/services",
        element: (
          <Suspense fallback={<Loader />}>
            <PackageDetails />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "contact",
        path: "/contact",
        element: (
          <Suspense fallback={<Loader />}>
            <ContactPage />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "TermsAndConditions",
        path: "/privacy_policy",
        element: (
          <Suspense fallback={<Loader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "TermsAndConditions",
        path: "/terms_and_conditions",
        element: (
          <Suspense fallback={<Loader />}>
            <TermsAndConditions />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "ReturnAndRefundPolicy",
        path: "/return_and_refund_policy",
        element: (
          <Suspense fallback={<Loader />}>
            <ReturnAndRefundPolicy />
          </Suspense>
        ),
        children: [],
      },
    ],
  },

  // Admin Routes
  {
    key: "admin",
    path: "admin",
    element: (
      <Suspense fallback={<Loader />}>
        <Sidebar>
          <Outlet />
        </Sidebar>
      </Suspense>
    ),
    children: [
      {
        key: "einviteCrud",
        path: "einvite_crud",
        element: (
          <Suspense fallback={<Loader />}>
            <EInviteCrud />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "egalleryCrud",
        path: "egallery_crud",
        element: (
          <Suspense fallback={<Loader />}>
            <EGalleryCrud />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "ealbumCrud",
        path: "ealbum_crud",
        element: (
          <Suspense fallback={<Loader />}>
            <EAlbumCrud />
          </Suspense>
        ),
        children: [],
      },
      {
        key: "imageCrud",
        path: "image_crud",
        element: (
          <Suspense fallback={<Loader />}>
            <CmsImageCrud />
          </Suspense>
        ),
        children: [],
      },
    ],
  },
];

export default routerData;
