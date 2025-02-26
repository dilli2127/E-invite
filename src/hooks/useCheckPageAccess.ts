// import { retrieve_item } from "@src/helpers/functions";

export const useCheckPageAccess = (key: string) => {
  let has_access: boolean | null = null;

  try {
    let page_accesses = "";

    if (page_accesses) {
      has_access = true;
    } else {
      has_access = false;
    }
  } catch (e) {
    has_access = false;
  }
  return has_access;
};
