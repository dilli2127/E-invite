import { RouteConfig } from "./types/routeConfig";
import Login from "../pages/login/login";
import Sidebar from "../components/antd/sidebar/sidebar";
import HomePage from "../pages/Dashboard";
import Einvite from "../pages/E-Invite";
import EInviteCrud from "../pages/E-InviteCrud/crud";
import LandingPage from "../pages/LadingPage";
import ComingSoon from "../pages/ComingSoon";
import ContactPage from "../pages/Contact";

const routerData: RouteConfig[] = [
  {
    key: "login",
    path: "/login",
    component: <Login />,
    children: [],
  },
  {
    key: "LandingPage",
    path: "/",
    component: <LandingPage />,
    children: [],
  },
  {
    key: "einvite",
    path: "/einvite/:id",
    component: <Einvite/>,
    children: [],
  },
  {
    key: "Home",
    path: "/home",
    component: <LandingPage/>,
    children: [],
  },
  {
    key: "Gallery",
    path: "/gallery",
    component: <ComingSoon/>,
    children: [],
  },
  {
    key: "Services",
    path: "/services",
    component: <ComingSoon/>,
    children: [],
  },
  {
    key: "Contact",
    path: "/contact",
    component: <ContactPage/>,
    children: [],
  },
  {
    key: "einvite",
    path: "/einvite_crud",
    component: (
      <Sidebar>
        <EInviteCrud items={[]} />
      </Sidebar>
    ),
    // component: <EInviteCrud />,
    children: [],
  },
  
  {
    key: "home",
    path: "/home",
    component: (
      <Sidebar>
        <HomePage />
      </Sidebar>
    ),
    children: [],
  },
];

export default routerData;
