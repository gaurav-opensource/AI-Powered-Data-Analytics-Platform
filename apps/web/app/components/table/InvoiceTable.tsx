// src/components/InvoicesByVendorTable.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InvoiceRow from './InvoiceRow'; // Row Component import
import { InvoiceData } from '../types/InvoiceData'; // Data Structure import

const API_URL = 'https://api.yourdomain.com/invoices/top-vendors'; 

const InvoicesByVendorTable: React.FC = () => {
  const [invoiceList, setInvoiceList] = useState<InvoiceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API Fetch Logic (Same as before)
  useEffect(() => {
    // ... (Your API fetching logic here, using axios or fetch) ...
    // For demonstration, using dummy data immediately:
    
    // (Replace the following block with your actual async fetch function)
    const fetchInvoices = async () => {
        try {
            // const response = await axios.get<InvoiceData[]>(API_URL);
            // setInvoiceList(response.data);
            
            // Using dummy data for immediate display:
            const { dummyInvoiceList } = await import('../types/InvoiceData');
            setInvoiceList(dummyInvoiceList); 

        } catch (err) {
            setError("Failed to fetch data.");
        } finally {
            setIsLoading(false); 
        }
    };
    fetchInvoices();
  }, []); 

  // --- Conditional Rendering ---
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-sm text-center text-gray-500">
        Loading Invoices... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-sm text-center text-red-500">
        Error: {error} 😟
      </div>
    );
  }
  
  // --- Main Table Rendering ---
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md max-w-sm">
      {/* Header Section */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Invoices by Vendor
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Top vendors by invoice count and net value.
      </p>
      
      {/* Table Header Row */}
      <div className="flex text-xs font-medium text-gray-500 uppercase border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
        <div className="w-5/12">Vendor</div>
        <div className="w-4/12 text-center"># Invoices</div>
        <div className="w-3/12 text-right">Net Value</div>
      </div>

      {/* Table Rows - Mapping through data using InvoiceRow */}
      <div className="max-h-64 overflow-y-auto">
        {invoiceList.map((invoice, index) => (
          <InvoiceRow 
            key={index}
            invoice={invoice}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoicesByVendorTable;