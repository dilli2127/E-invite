export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const API_ROUTES = {
  GetEivite: {
    Add: {
      identifier: "AddLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/add",
    },
    Update: {
      identifier: "UpdateLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/update",
    },
    UpdateTemplate: {
      identifier: "UpdateTemplateLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/mark-as-default",
    },
    Get: {
      identifier: "GetEinvite",
      method: API_METHODS.GET,
      endpoint: "e_invite/",
    },
    Delete: {
      identifier: "DeleteLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/delete",
    },
  },
  FileUploder: {
    Add: {
      identifier: "file-upload",
      method: API_METHODS.POST,
      endpoint: "/file-upload",
    },
    Update: {
      identifier: "UpdateLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/update",
    },
    UpdateTemplate: {
      identifier: "UpdateTemplateLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/mark-as-default",
    },
    Get: {
      identifier: "GetEinvite",
      method: API_METHODS.GET,
      endpoint: "e_invite/",
    },
    Delete: {
      identifier: "DeleteLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/delete",
    },
  },
  CmsImage: {
    Add: {
      identifier: "AddCmsImage",
      method: API_METHODS.PUT,
      endpoint: "/cms_image",
    },
    Update: {
      identifier: "UpdateCmsImage",
      method: API_METHODS.POST,
      endpoint: "/cms_image",
    },
    Get: {
      identifier: "GetCmsImage",
      method: API_METHODS.GET,
      endpoint: "/cms_image",
    },
    Delete: {
      identifier: "DeleteCmsImage",
      method: API_METHODS.POST,
      endpoint: "/cms_image",
    },
  },
 
};
