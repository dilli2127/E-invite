import { message } from "antd";
import { API_ROUTES } from "../services/api/utils";

export const showToast = (type: "success" | "error", content: string) => {
  if (type === "success") {
    message.success(content);
  } else if (type === "error") {
    message.error(content);
  }
};

export const getApiRouteCmsImage = (action: keyof typeof API_ROUTES.CmsImage) => {
  const route = API_ROUTES?.CmsImage?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};

export const getApiRouteGetEivite = (action: keyof typeof API_ROUTES.GetEivite) => {
  const route = API_ROUTES?.GetEivite?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};
export const getApiRouteGallareyCategory = (action: keyof typeof API_ROUTES.GalleryCategory) => {
  const route = API_ROUTES?.GalleryCategory?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};
export const getApiRouteGallarey = (action: keyof typeof API_ROUTES.Gallery) => {
  const route = API_ROUTES?.Gallery?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};
export const getApiRouteEGallery = (action: keyof typeof API_ROUTES.EGallery) => {
  const route = API_ROUTES?.EGallery?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};
export const getApiRouteUser = (action: keyof typeof API_ROUTES.User) => {
  const route = API_ROUTES?.User?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};
export const getApiRouteEAlbum = (action: keyof typeof API_ROUTES.EAlbum) => {
  const route = API_ROUTES?.EAlbum?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};