// src/router/types.ts

import { ReactNode } from "react";

export interface RouteConfig {
  key: string;
  path: string;
  element?: ReactNode;
  children?: RouteConfig[];
}
export interface Album {
  _id: number;
  title: string;
  galleryname: string;
  gallerycover: string;
}

