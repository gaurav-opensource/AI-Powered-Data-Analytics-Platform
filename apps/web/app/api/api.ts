const BASE_URL = "http://localhost:5000/api";

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.statusText}`);
  }

  return res.json();
}

const api = {
  //  Dashboard KPIs
  getDashboardStats: () => apiFetch("/stats/dashboard"),

  //  Invoice Trend Chart
  getInvoiceTrends: () => apiFetch("/invoice-trends"),

  // Category Spend Chart
  getCategorySpend: () => apiFetch("/category-spend"),

  // Cash Outflow Chart
  getCashOutflow: () => apiFetch("/cash-outflow"),

  // All Invoices Table
  getInvoices: () => apiFetch("/invoices"),
  //Vendor Chart
  getVendorInvoices: () => apiFetch("/vendor"),


  // Invoice by ID
  getInvoiceById: (id: number) => apiFetch(`/invoices/${id}`),

  // Chat Assistant (if any AI or chat route exists)
   //  Chat With Data
  chatWithData: (query: string) =>
    apiFetch("/chat-with-data", {
      method: "POST",
      body: JSON.stringify({ query }),
    }),
};

export default api;
