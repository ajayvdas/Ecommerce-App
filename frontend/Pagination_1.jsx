import { PAGE_SIZE } from "@/utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ count }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const pageCount = Math.ceil(count / PAGE_SIZE);

    function nextPage() {
        const next = currentPage === pageCount ? currentPage : currentPage + 1;
        searchParams.set("page", next);
        searchParams.set("limit", PAGE_SIZE);
        setSearchParams(searchParams);
    }

    function prevPage() {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set("page", prev);
        searchParams.set("limit", PAGE_SIZE);
        setSearchParams(searchParams);
    }

    if (pageCount <= 1) return null;

    console.log("searchParams in Paginaton is: ", searchParams)

    return (
        <div className="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {/* Mobile view */}
                <button
                    onClick={prevPage}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span>Previous</span>
                </button>
                <button
                    onClick={nextPage}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>

            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
                        <span>{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of <span>{count}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={prevPage}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            <span className="ml-2 text-sm font-medium text-gray-700">Previous</span>
                        </button>

                        <button
                            onClick={nextPage}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-600 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="mr-2 text-sm font-medium text-gray-700">Next</span>
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
