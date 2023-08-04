import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useEffect, useState } from 'react';
import { useMoveBack } from '../../hooks/useMoveBack';
import Checkbox from '../../ui/Checkbox';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import useBooking from '../bookings/useBooking';
import useSettings from '../settings/useSettings';
import useCheckin from './useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkIn, isCheckingIn } = useCheckin();
  const { data: booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check In Booking #: {bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
          id='confirm'
        >
          I confirm that {guests.fullName} has paid in full the sum of:
          <strong>
            {!addBreakfast
              ? formatCurrency(totalPrice)
              : `${formatCurrency(
                  totalPrice + optionalBreakfastPrice
                )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice
                )})`}
          </strong>
        </Checkbox>
      </Box>

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id={'breakfast'}
            onChange={() => {
              setConfirmPaid((confirmPaid) => !confirmPaid);
              setAddBreakfast((add) => !add);
            }}
          >
            Add Breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check In Booking # {bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
