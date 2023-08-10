import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
  //1.) Num bookings
  const numBookings = bookings.length;

  //2.) Total Earned In Selected Period
  const sales = bookings.reduce((acc, cur) => {
    return acc + cur.totalPrice;
  }, 0);

  //3.) Total Check-Ins In Selected Period
  const checkins = confirmedStays.length;

  //4.) Total Occupancy Rate In Selected Period
  const occupation =
    confirmedStays.reduce((acc, cur) => {
      return acc + cur.numNights;
    }, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
        color='blue'
      />
      <Stat
        title='Sales'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
        color='green'
      />
      <Stat
        title='Check-Ins'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
        color='indigo'
      />
      <Stat
        title='Occupancy Rate'
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
        color='yellow'
      />
    </>
  );
};

export default Stats;
