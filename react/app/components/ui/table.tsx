import React, {useState} from "react";
import styles from "./table.module.css";
import {LabelBase} from "./field-base";
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
import { ButtonBase } from "./button-base";

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
        <div className={styles.Container}>
            {data.title && <h3 className={styles.Title}>{data.title}</h3>}
            <div className={styles.Controls}>
                <div className={styles.SearchWrapper}>
                    <input
                        type="text"
                        placeholder="Suche..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(0);
                        }}
                        className={styles.SearchInput}
                    />
                    <span className={styles.SearchIcon}>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
     className="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
          </span>
                </div>

            </div>
            <div className={styles.TableWrapper}>
                <ShadcnTable className={styles.ShadcnTable}>
                    <TableHeader>
                        <TableRow className={styles.TableRowHeader}>
                            {headers.map((header, idx) => (
                                <TableHead
                                    key={idx}
                                    onClick={() => handleSort(idx)}
                                    className={styles.TableHead}
                                >
                                    <div className="flex items-center gap-1">
                                        {header}
                                        {sortIdx === idx && (
                                            <span className={styles.SortIcon}>
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
                                            <span className={styles.SortIconPlaceholder}>
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
                                className={styles.TableRowBody}
                            >
                                {row.map((cell, cIdx) => (
                                    <TableCell key={cIdx}
                                               className={styles.TableCellBody}>
                                        {search ? (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: cell.replace(
                                                        new RegExp(`(${search})`, "gi"),
                                                        `<mark class="${styles.Mark}">$1</mark>`
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
                    <div className={styles.NoData}>Keine Daten gefunden.</div>
                )}
            </div>
            <div className={styles.Pagination}>
                <div className="flex items-center gap-1">
                    <select
                        id="table-page-size"
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(0);
                        }}
                        className={styles.PageSizeSelect}
                    >
                        {pageSizes.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.PaginationControls}>
                    <ButtonBase
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        aria-label="Vorherige Seite"
                        className={styles.PaginationButton}
                    >
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M13 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </ButtonBase>
                    <span
                        className={styles.PageInfo}>
            {page + 1} / {pageCount || 1}
          </span>
                    <ButtonBase
                        onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
                        disabled={page >= pageCount - 1}
                        aria-label="Nächste Seite"
                        className={styles.PaginationButton}
                    >
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                            <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </ButtonBase>
                </div>
            </div>
        </div>
    );
};
