export const API_METHODS = {
  GET: "GET",
  POST: "POST",
};

export const API_ROUTES = {
  LedgerDefinition: {
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
      identifier: "GetLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/",
    },
    Delete: {
      identifier: "DeleteLedgerDefinition",
      method: API_METHODS.POST,
      endpoint: "ledger-definition/delete",
    },
  },
  AuditOverview: {
    Add: {
      identifier: "AddAuditOverview",
      method: API_METHODS.POST,
      endpoint: "audit-overview/add",
    },
    Update: {
      identifier: "UpdateAuditOverview",
      method: API_METHODS.POST,
      endpoint: "audit-overview/update",
    },
    Get: {
      identifier: "GetAuditOverview",
      method: API_METHODS.POST,
      endpoint: "audit-overview/",
    },
    Delete: {
      identifier: "DeleteAuditOverview",
      method: API_METHODS.POST,
      endpoint: "audit-overview/delete",
    },
  },
  AuditTransaction: {
    Add: {
      identifier: "AddAuditTransaction",
      method: API_METHODS.POST,
      endpoint: "audit-transaction/bulk-insert",
    },
    Update: {
      identifier: "UpdateAuditTransaction",
      method: API_METHODS.POST,
      endpoint: "audit-transaction/update",
    },
    Get: {
      identifier: "GetAuditTransaction",
      method: API_METHODS.POST,
      endpoint: "audit-transaction/",
    },
  },
  AuditClosingBalance: {
    Add: {
      identifier: "AddAuditClosingBalance",
      method: API_METHODS.POST,
      endpoint: "audit-closing-balance/bulk-insert",
    },
    Update: {
      identifier: "UpdateAuditClosingBalance",
      method: API_METHODS.POST,
      endpoint: "audit-closing-balance/update",
    },
    Get: {
      identifier: "GetAuditClosingBalance",
      method: API_METHODS.POST,
      endpoint: "audit-closing-balance/",
    },
  },
  BanalceSheet: {
    Get: {
      identifier: "GetBalanceSheet",
      method: API_METHODS.POST,
      endpoint: "report/balance-sheet",
    },
  },
  Reports: {
    BalanceSheet: {
      identifier: "GetBalanceSheet",
      method: API_METHODS.POST,
      endpoint: "report/balance-sheet",
    },
    IncomeExpenditure: {
      identifier: "GetIncomeExpenditure",
      method: API_METHODS.POST,
      endpoint: "report/income-expenditure",
    },
    ReceiptPayments: {
      identifier: "GetReceiptPayments",
      method: API_METHODS.POST,
      endpoint: "report/receipt-payments",
    },
  },
  TrialBalanceSheet: {
    identifier: "GetTrialBalanceSheet",
    method: API_METHODS.POST,
    endpoint: "get-trail-balance-sheet",
  },
  Receipts: {
    identifier: "GetReceipt",
    method: API_METHODS.POST,
    endpoint: "get-receipt",
  },
  Payments: {
    identifier: "GetPayments",
    method: API_METHODS.POST,
    endpoint: "get-payments",
  },
};
