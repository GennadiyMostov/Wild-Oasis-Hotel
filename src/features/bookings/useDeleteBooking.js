import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

const useDeleteBooking = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { bookingId } = useParams();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: () => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success('Booking Deleted Successfully');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
      navigate('/bookings');
    },
  });
  return { deleteBooking, isDeletingBooking };
};

export default useDeleteBooking;
