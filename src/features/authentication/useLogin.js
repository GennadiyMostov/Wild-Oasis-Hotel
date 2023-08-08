import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user); //<-- caches user data so fetching is not required again.
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.log('ERROR', error);
      return toast.error('Email or Password Incorrect. Try Again.');
    },
  });

  return { login, isLoading };
};

export default useLogin;
