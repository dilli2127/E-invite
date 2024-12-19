// src/router/types.ts

export interface RouteConfig {
  key: string;
  path: string;
  component: JSX.Element;
  children: RouteConfig[];
}


