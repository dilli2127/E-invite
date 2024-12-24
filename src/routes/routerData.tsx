import { RouteConfig } from "./types/routeConfig";
import Login from "../pages/login/login";
import Sidebar from "../components/antd/sidebar/sidebar";
import HomePage from "../pages/Dashboard";
import Einvite from "../pages/E-Invite";
import EInviteCrud from "../pages/E-InviteCrud/crud";
import LandingPage from "../pages/LadingPage";

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
