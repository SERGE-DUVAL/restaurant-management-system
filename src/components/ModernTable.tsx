"use client";

import React from "react";

interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface ModernTableProps {
  columns: TableColumn[];
  data: any[];
}

const ModernTable: React.FC<ModernTableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-[--color-accent]/20 bg-gradient-to-r from-[--color-accent]/10 to-transparent">
            {columns.map((column, index) => (
              <th
                key={index}
                className="py-4 px-6 text-left text-sm font-semibold text-[--color-accent] uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[--color-accent]/10">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-[--color-accent]/5 transition-all duration-200 group"
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="py-4 px-6 text-sm text-[--color-text] group-hover:text-[--color-accent] transition-colors"
                >
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModernTable;

