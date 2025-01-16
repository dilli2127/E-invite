export const API_METHODS = {
  GET: "GET",
  POST: "POST",
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
 
};
