import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';

const useSignup = () => {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success('Account Created, Proceed to email to verify account.');
    },
  });
  return { signUp, isLoading };
};

export default useSignup;
