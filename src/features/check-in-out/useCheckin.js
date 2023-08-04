import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCheckin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, { status: 'checked-in', isPaid: true });
    },
    onSuccess: (data) => {
      toast.success(`Booking #: ${data.id} checked in successfully.`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/bookings/${data.id}`);
    },
    onError: (err) => {
      toast.error('An error occured while checking in.');
    },
  });
  return { checkIn, isCheckingIn };
};

export default useCheckin;
