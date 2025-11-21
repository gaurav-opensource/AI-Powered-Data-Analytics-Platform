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
  // Dashboard KPIs
  getDashboardStats: () => apiFetch("/stats/dashboard"),

  // Invoice trend chart
  getInvoiceTrends: () => apiFetch("/invoice-trends"),

  // Category spend chart
  getCategorySpend: () => apiFetch("/category-spend"),

  // Cash outflow chart
  getCashOutflow: () => apiFetch("/cash-outflow"),

  // All invoices table
  getInvoices: () => apiFetch("/invoices"),

  // Vendor chart
  getVendorInvoices: () => apiFetch("/vendor"),

  // Invoice by ID
  getInvoiceById: (id: number) => apiFetch(`/invoices/${id}`),

  // Chat With Data
  chatWithData: (query: string) =>
    apiFetch("/chat-with-data", {
      method: "POST",
      body: JSON.stringify({ query }),
    }),
};

export default api;
