import React, { useState } from "react";
import { Button } from "./button";
import { Label } from "./label";
import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./table-shadcn";

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

  // Pagination, Search, Sort State
  const pageSizes = [15, 20, 45, 75, 125];
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [sortIdx, setSortIdx] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState<number>(pageSizes[0]);

  // Filter rows by search (case-insensitive, %like%)
  const filteredRows = bodyRows.filter((row) =>
    row.some((cell) => cell.toLowerCase().includes(search.toLowerCase()))
  );

  // Sort rows
  const sortedRows =
    sortIdx !== null
      ? [...filteredRows].sort((a, b) => {
          const aVal = a[sortIdx] || "";
          const bVal = b[sortIdx] || "";
          if (aVal < bVal) return sortAsc ? -1 : 1;
          if (aVal > bVal) return sortAsc ? 1 : -1;
          return 0;
        })
      : filteredRows;

  // Pagination
  const pageCount = Math.ceil(sortedRows.length / pageSize);
  const pagedRows = sortedRows.slice(page * pageSize, (page + 1) * pageSize);

  // Sort click handler
  const handleSort = (idx: number) => {
    if (sortIdx === idx) {
      if (sortAsc) {
        setSortAsc(false); // von asc auf desc
      } else {
        setSortIdx(null); // von desc auf unsortiert
        setSortAsc(true);
      }
    } else {
      setSortIdx(idx); // neue Spalte, immer auf asc
      setSortAsc(true);
    }
  };

  return (
    <div>
      {data.title && <h3>{data.title}</h3>}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Suche..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          style={{
            height: 40,
            minWidth: 200,
            borderRadius: 6,
            border: "1px solid #ccc",
            padding: "0 12px",
            fontSize: 16,
          }}
        />
        {search && (
          <span
            style={{
              marginLeft: 8,
              fontSize: 12,
              color: "#888",
            }}
          >
            Treffer: "{search}"
          </span>
        )}
      </div>
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            {headers.map((header, idx) => (
              <TableHead key={idx} onClick={() => handleSort(idx)} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {header}
                  {sortIdx === idx && (
                    <span style={{ fontSize: 14 }}>
                      {sortAsc ? (
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M10 6l4 5H6l4-5z" fill="currentColor" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                          <path d="M10 14l-4-5h8l-4 5z" fill="currentColor" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedRows.map((row, rIdx) => (
            <TableRow key={rIdx}>
              {row.map((cell, cIdx) => (
                <TableCell key={cIdx}>
                  {search ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: cell.replace(
                          new RegExp(`(${search})`, "gi"),
                          '<mark style="background: #fde68a">$1</mark>'
                        ),
                      }}
                    />
                  ) : (
                    cell
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
      {sortedRows.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "#888",
            padding: "24px 0",
          }}
        >
          Keine Daten gefunden.
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Label htmlFor="table-page-size">Zeilen pro Seite:</Label>
          <select
            id="table-page-size"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Vorherige Seite"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13 15l-5-5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          <span style={{ fontSize: 16, padding: "0 8px" }}>
            Seite {page + 1} / {pageCount || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page >= pageCount - 1}
            aria-label="Nächste Seite"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7 5l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
