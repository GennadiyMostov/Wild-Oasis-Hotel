import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCheckout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: 'checked-out',
      });
    },
    onSuccess: (data) => {
      toast.success(`Booking #: ${data.id} checked out successfully.`);
      queryClient.invalidateQueries({ active: true });
      navigate(`/bookings/${data.id}`);
    },
    onError: (err) => {
      console.error(err);
      toast.error('An error occured while checking in.');
    },
  });
  return { checkOut, isCheckingOut };
};

export default useCheckout;
