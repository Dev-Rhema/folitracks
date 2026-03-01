import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchBar from "../dashboardComponents/SearchBar";

function Table({
  columns,
  data,
  rowsPerPage = 10,
  title = "",
  onActionClick,
  showSearch = false,
  showPagination = true,
  searchPlaceholder = "Search...",
  searchTerm = "",
  onSearchChange,
  searchableFields,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  // Close menu on outside click
  useEffect(() => {
    if (openMenuIndex === null) return;
    const close = () => setOpenMenuIndex(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [openMenuIndex]);

  // Close menu on page change
  useEffect(() => {
    setOpenMenuIndex(null);
  }, [currentPage]);

  // Use external or internal search term
  const activeSearchTerm =
    searchTerm !== undefined ? searchTerm : internalSearchTerm;

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!activeSearchTerm.trim()) {
      return data;
    }

    return data.filter((row) => {
      const fieldsToSearch = searchableFields || Object.keys(row);
      return fieldsToSearch.some((field) =>
        row[field]
          ?.toString()
          .toLowerCase()
          .includes(activeSearchTerm.toLowerCase()),
      );
    });
  }, [data, activeSearchTerm, searchableFields]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleSearch = (value) => {
    setCurrentPage(1);
    if (searchTerm === undefined) {
      setInternalSearchTerm(value);
    } else if (onSearchChange) {
      onSearchChange(value);
    }
  };

  // Generate page display items (numbers + ellipsis markers)
  const getPageDisplay = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="w-full bg-white rounded-2xl">
      {/* Search Bar */}
      {showSearch && (
        <div className="mb-4 flex gap-4 items-center">
          <SearchBar
            placeholder={searchPlaceholder}
            value={activeSearchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1"
          />
          <button className="px-4 py-2 border bg-white rounded-md hover:bg-gray-50  flex items-center gap-2 cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Filter
          </button>
        </div>
      )}

      {/* Table */}
      <div className="w-full border rounded-2xl bg-white overflow-x-auto">
        <table className="w-full min-w-150">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-2 xl:px-4 xl:py-3 text-left text-xs xl:text-sm font-semibold text-[#3B82F6] font-title"
                >
                  {column.label}
                </th>
              ))}
              <th className="px-3 py-2 xl:px-4 xl:py-3 text-right text-xs xl:text-sm font-semibold text-[#3B82F6] font-title">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="font-body">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-3 py-2 xl:px-4 xl:py-2.5 text-xs xl:text-sm font-body"
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  <td className="px-3 py-2 xl:px-4 xl:py-2.5 text-xs xl:text-sm text-right font-body">
                    <div className="relative inline-block">
                      <button
                        className="p-1 hover:bg-gray-200 rounded-full transition inline-flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuIndex(
                            openMenuIndex === rowIndex ? null : rowIndex,
                          );
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="5" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="19" r="2" />
                        </svg>
                      </button>

                      {openMenuIndex === rowIndex && (
                        <div
                          className="absolute top-full right-0 z-50 w-44 bg-white border border-gray-200 rounded-xl overflow-hidden"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-gray-50 border-b border-gray-100 font-body cursor-pointer"
                            onClick={() => {
                              onActionClick?.(row, "view");
                              setOpenMenuIndex(null);
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="w-full text-left px-5 py-3 text-sm text-[gray-800] hover:bg-gray-50 border-b border-gray-100 font-body cursor-pointer"
                            onClick={() => {
                              onActionClick?.(row, "edit");
                              setOpenMenuIndex(null);
                            }}
                          >
                            Edit Details
                          </button>
                          <button
                            className="w-full text-left px-5 py-3 text-sm text-red-500 hover:bg-gray-50 font-body cursor-pointer"
                            onClick={() => {
                              onActionClick?.(row, "remove");
                              setOpenMenuIndex(null);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-gray-500 font-body"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPagination && <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1}-
          {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length}
        </p>
        <div className="flex gap-2 items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="w-9 h-9 border border-gray-200 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          {getPageDisplay().map((item, idx) =>
            item === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-1 text-gray-400 text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => handlePageClick(item)}
                className={`w-9 h-9 rounded-md text-sm font-medium transition cursor-pointer ${
                  currentPage === item
                    ? "bg-gray-900 text-white"
                    : "border border-gray-200 hover:bg-gray-50 text-gray-700"
                }`}
              >
                {String(item).padStart(2, "0")}
              </button>
            ),
          )}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="w-9 h-9 bg-gray-900 text-white rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-700 flex items-center justify-center cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>}
    </div>
  );
}

export default Table;
