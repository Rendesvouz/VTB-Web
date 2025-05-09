import React, { useState } from "react";

const DataTable = ({
  columns = [],
  data,
  onRowClick,
  emptyMessage = "No data available",
  maxHeight = "600px",
}) => {
  console.log("truckData", data);
  return (
    <div className="shadow border-b border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto" style={{ maxHeight }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns?.map((column, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={column.width ? { width: column.width } : {}}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.length > 0 ? (
              data?.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  onClick={() => onRowClick && onRowClick(row)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  {columns?.map((column, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                      {column?.render
                        ? column.render(row)
                        : row[column?.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [];

  // Create array of page numbers to display
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }
};

export default DataTable;
