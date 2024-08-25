import { getPageNumbers } from '@/utils/pagination';
import { Link, useLocation } from 'react-router-dom';

export default function Pagination({ page = 1, pages = 0 }: PaginationProps) {
    const location = useLocation();
    const pathname = location.pathname;
    const params = location.search;
    const searchParams = new URLSearchParams(params.toString());

    if (searchParams.get('page')) page = parseInt(searchParams.get('page'));
    const pageNumbers = getPageNumbers({ page, pages });

    const generateLink = (page: number = 1): string => {
        if (page <= 0) page = 1;
        if (page >= pages) page = pages;
        searchParams.set('page', page.toString());

        return `${pathname}?${searchParams.toString()}`;
    };

    return (
        <div className="rounded-b-lg border-t border-t-light-border px-4 py-2 bg-[#F9FAFB]">
            <ol className="flex justify-end gap-1 text-xs font-medium">
                {page > 1 && (
                    <li>
                        <Link
                            to={generateLink(page - 1)}
                            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
                            <span className="sr-only">Prev Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </li>
                )}

                {pageNumbers.map((pageNumber: number | string) => {
                    return pageNumber === '...' ? (
                        <li key={`pagination-${pageNumber}`}>
                            <span className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">
                                &hellip;
                            </span>
                        </li>
                    ) : (
                        <li key={`pagination-${pageNumber}`}>
                            <Link
                                to={generateLink(pageNumber as number)}
                                className={`block size-8 rounded border text-center leading-8 ${
                                    pageNumber == page
                                        ? 'border-pink/50 bg-pink/20 text-pink'
                                        : 'border-gray-100 bg-white text-gray-500'
                                }`}>
                                {pageNumber}
                            </Link>
                        </li>
                    );
                })}

                {pages > 1 && page < pages && (
                    <li>
                        <Link
                            to={generateLink(page + 1)}
                            className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
                            <span className="sr-only">Next Page</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </li>
                )}
            </ol>
        </div>
    );
}
