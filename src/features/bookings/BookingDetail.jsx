import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import useCheckout from '../check-in-out/useCheckout';
import useDeleteBooking from './useDeleteBooking';
import { toast } from 'react-hot-toast';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const StyledSpan = styled.span`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;

function BookingDetail() {
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { data: booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'red',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #: {bookingId} </Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}
        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isCheckingOut}
            onClick={() => {
              checkOut(bookingId);
            }}
          >
            Check Out
          </Button>
        )}
        {status === 'checked-out' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            disabled={isDeletingBooking}
            onClick={() => {
              toast((t) => (
                <div>
                  <p>Are you sure you want to delete this booking?</p>
                  <StyledSpan>
                    <Button
                      onClick={() => {
                        deleteBooking(bookingId);
                        toast.dismiss(t.id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
                  </StyledSpan>
                </div>
              ));
            }}
          >
            Delete Booking
          </Button>
        )}
        <Button variation='secondary' onClick={() => navigate('/bookings')}>
          Back To Bookings
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
