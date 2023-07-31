import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ cabinEditData, id }) => createEditCabin(cabinEditData, id),
    onSuccess: () => {
      toast.success('Edit Successfull');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(`Failed To Edit Cabin: ${err.message}`);
    },
  });

  return { isEditing, editCabin };
};

export default useEditCabin;
