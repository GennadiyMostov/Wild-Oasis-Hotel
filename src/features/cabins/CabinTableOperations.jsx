import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField={'discount'}
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No Discount' },
          { value: 'with-discount', label: 'With Discount' },
        ]}
      />
      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort By Name (A-Z)' },
          { value: 'name-desc', label: 'Sort By Name (Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort By Price (Lowest First)' },
          {
            value: 'regularPrice-desc',
            label: 'Sort By Price (Highest First)',
          },
          { value: 'maxCapacity-asc', label: 'Sort By Capacity (Low First)' },
          {
            value: 'maxCapacity-desc',
            label: 'Sort By Capacity (Highest First)',
          },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
