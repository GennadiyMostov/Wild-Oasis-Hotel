import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Edit Successfull');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
    onError: (err) => {
      toast.error(`Failed To Edit Setting: ${err.message}`);
    },
  });

  return { isUpdating, updateSetting };
};

export default useUpdateSetting;
