import React from "react";

interface TableProps {
  data: {
    csv: string;
    title?: string;
  };
}

function parseCSV(csv: string): string[][] {
  return csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(/;|,|\t/).map((cell) => cell.trim()));
}

export const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || !data.csv) return null;
  const rows = parseCSV(data.csv);
  if (rows.length === 0) return null;
  const headers = rows[0];
  const bodyRows = rows.slice(1);

  return (
    <div className="overflow-x-auto my-6">
      {data.title && <h3 className="font-bold text-lg mb-2">{data.title}</h3>}
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-sm font-semibold text-gray-700"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className="even:bg-gray-50">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-gray-800"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
