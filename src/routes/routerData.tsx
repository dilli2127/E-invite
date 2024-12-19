import { RouteConfig } from "./types/routeConfig";
import Login from "../pages/login/login";
import Sidebar from "../components/antd/sidebar/sidebar";
import HomePage from "../pages/Dashboard";
import Einvite from "../pages/E-Invite";

const routerData: RouteConfig[] = [
  {
    key: "login",
    path: "/login",
    component: <Login />,
    children: [],
  },
  {
    key: "login",
    path: "/",
    component: <Login />,
    children: [],
  },
  {
    key: "einvite",
    path: "/einvite",
    component: <Einvite />,
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
