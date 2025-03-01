import { message } from "antd";
import { API_ROUTES } from "../services/api/utils";

export const showToast = (type: "success" | "error", content: string) => {
  if (type === "success") {
    message.success(content);
  } else if (type === "error") {
    message.error(content);
  }
};

export const getApiRoute = (action: keyof typeof API_ROUTES.CmsImage) => {
  const route = API_ROUTES?.CmsImage?.[action];
  if (!route) {
    console.error(`API_ROUTES.CmsImage.${action} is undefined.`);
    throw new Error(`API route for CmsImage.${action} is not defined.`);
  }
  return route;
};