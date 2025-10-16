import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * A universal hook for managing table query params (pagination, sorting, filtering)
 * @param allowedFilters Optional array of filter keys to include (e.g. ['status', 'paymentStatus'])
 */
export default function useTableQueryParams(allowedFilters?: string[]) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());

  // Optional filter extraction
  let filterParams: Record<string, string> = {};

  if (allowedFilters && allowedFilters.length > 0) {
    filterParams = Object.fromEntries(
      Object.entries(queryObject).filter(([key]) =>
        allowedFilters.includes(key),
      ),
    );
  } else {
    // If no allowed filters provided, include *everything* except pagination/sorting keys
    filterParams = Object.fromEntries(
      Object.entries(queryObject).filter(
        ([key]) => !['page', 'limit', 'sortBy', 'order'].includes(key),
      ),
    );
  }

  const page = Number(queryObject.page || 1);
  const limit = Number(queryObject.limit || 10);
  const sortBy = queryObject.sortBy || 'createdAt';
  const order = queryObject.order || 'desc';

  const setQueryParams = function (
    newParams: Record<string, string | number | null>,
  ) {
    const updated = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, val]) => {
      if (val === '' || val === null || val === undefined) {
        updated.delete(key);
      } else {
        updated.set(key, String(val));
      }
    });

    replace(`${pathname}?${updated.toString()}`);
  };

  return {
    queryParams: { ...filterParams, page, limit, sortBy, order },
    setQueryParams,
    searchParams,
  };
}
