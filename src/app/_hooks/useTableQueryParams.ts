import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ESCROW_FILTER_LIST } from '../_constants/escrowCategories';

export default function useTableQueryParams() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());

  const filterParams = Object.fromEntries(
    Object.entries(queryObject).filter(([key]) =>
      ESCROW_FILTER_LIST.includes(key),
    ),
  );

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
