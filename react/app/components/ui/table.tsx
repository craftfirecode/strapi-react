import React, {useState} from "react";
import {Button} from "./button";
import {Label} from "./label";
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

export const Table: React.FC<TableProps> = ({data}) => {
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
        <div className="w-full max-w-full mx-auto">
            {data.title && <h3 className="text-xl font-semibold mb-4">{data.title}</h3>}
            <div className="flex items-center gap-2 mb-4">
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Suche..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(0);
                        }}
                        className="w-full h-10 rounded-full border border-gray-200 bg-background px-3 py-2 pr-10 text-sm shadow"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
     className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
          </span>
                </div>

            </div>
            <div className="rounded-lg shadow-lg bg-white text-card-foreground overflow-x-auto">
                <ShadcnTable className="min-w-full border-separate border-spacing-0">
                    <TableHeader>
                        <TableRow className="bg-muted/40">
                            {headers.map((header, idx) => (
                                <TableHead
                                    key={idx}
                                    onClick={() => handleSort(idx)}
                                    className="select-none cursor-pointer group whitespace-nowrap px-4 py-3 text-left text-xs font-semibold text-muted-foreground tracking-wider uppercase bg-muted/40 hover:bg-muted/60 transition-colors"
                                >
                                    <div className="flex items-center gap-1">
                                        {header}
                                        {sortIdx === idx && (
                                            <span className="ml-1">
                        {sortAsc ? (
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M10 6l4 5H6l4-5z" fill="currentColor"/>
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <path d="M10 14l-4-5h8l-4 5z" fill="currentColor"/>
                            </svg>
                        )}
                      </span>
                                        )}
                                        {sortIdx === idx || (
                                            <span className="opacity-0 group-hover:opacity-60 ml-1">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 6l4 5H6l4-5z"
                                                                                          fill="currentColor"/></svg>
                      </span>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pagedRows.map((row, rIdx) => (
                            <TableRow
                                key={rIdx}
                                className={`transition-colors even:bg-white odd:bg-gray-50 hover:bg-blue-50`}
                            >
                                {row.map((cell, cIdx) => (
                                    <TableCell key={cIdx}
                                               className="whitespace-nowrap px-4 py-2 text-sm text-foreground">
                                        {search ? (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: cell.replace(
                                                        new RegExp(`(${search})`, "gi"),
                                                        '<mark class="bg-yellow-200 text-black">$1</mark>'
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
                    <div className="text-center text-muted-foreground py-8">Keine Daten gefunden.</div>
                )}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 mt-4">
                <div className="flex items-center gap-1">
                    <select
                        id="table-page-size"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(0);
                        }}
                        className="h-8  rounded px-2 py-1 text-xs bg-background shadow transition-colors min-w-[48px]"
                    >
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-1 bg-muted/40 rounded-full px-2 py-1 shadow-sm">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        aria-label="Vorherige Seite"
                        className="border-0 rounded-full h-6 w-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/60 transition-colors p-0"
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Button>
                    <span
                        className="text-xs px-2 py-0.5 rounded bg-background text-foreground font-medium min-w-[60px] text-center">
            {page + 1} / {pageCount || 1}
          </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                        disabled={page >= pageCount - 1}
                        aria-label="Nächste Seite"
                        className="border-0 rounded-full h-6 w-6 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/60 transition-colors p-0"
                    >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};
