import React from 'react';

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { Sheet } from "lucide-react"


const ExcelExport = ({ data, fileName }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);  // Convert JSON data to sheet
    const workbook = XLSX.utils.book_new();  // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');  // Append the sheet
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  // Write the workbook to a buffer
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });  // Create a Blob for the file
    saveAs(blob, `${fileName}.xlsx`);  // Trigger file download
  };

  return ( 
    <Sheet className='text-green-600 cursor-pointer' onClick={exportToExcel} />
  );
}

export default ExcelExport;
