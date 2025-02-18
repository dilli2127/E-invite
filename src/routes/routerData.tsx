import { RouteConfig } from "./types/routeConfig";
import Login from "../pages/login/login";
import Sidebar from "../components/antd/sidebar/sidebar";
import HomePage from "../pages/Dashboard";
import Einvite from "../pages/E-Invite";
import EInviteCrud from "../pages/E-InviteCrud/crud";
import LandingPage from "../pages/LadingPage";
import ComingSoon from "../pages/ComingSoon";
import ContactPage from "../pages/Contact";
import AlbumPage from "../pages/Gallery";
import PhotoGallery from "../pages/Gallery/photoGallery";

const routerData: RouteConfig[] = [
  {
    key: "login",
    path: "/login",
    component: <Login />,
    children: [],
  },
  {
    key: "landingPage",
    path: "/",
    component: <LandingPage />,
    children: [],
  },
  {
    key: "einviteDetail",
    path: "/einvite/:id",
    component: <Einvite />,
    children: [],
  },
  {
    key: "gallery",
    path: "/gallery",
    component: <AlbumPage />,
    children: [],
  },
  {
    key: "gallery",
    path: "/gallery/:id",
    component: <PhotoGallery />,
    children: [],
  },
  {
    key: "services",
    path: "/services",
    component: <ComingSoon />,
    children: [],
  },
  {
    key: "contact",
    path: "/contact",
    component: <ContactPage />,
    children: [],
  },
  {
    key: "einviteCrud",
    path: "/einvite_crud",
    component: (
      <Sidebar>
        <EInviteCrud items={[]} />
      </Sidebar>
    ),
    children: [],
  },
];


export default routerData;
