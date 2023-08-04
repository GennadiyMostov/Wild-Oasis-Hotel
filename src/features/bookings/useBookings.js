import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

const useBookings = () => {
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  //Sort

  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  //Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page], //<-- This can be thought of as a dependency array
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { bookings, error, isLoading, count };
};

export default useBookings;
