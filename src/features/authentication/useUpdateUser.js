import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success('User account updated sucessfully.');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => {
      toast.error(`Failed To Update Account: ${err.message}`);
    },
  });

  return { updateUser, isUpdating };
};

export default useUpdateUser;
