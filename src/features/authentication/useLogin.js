import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logIn as logInApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logIn, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user); //<-- caches user data so fetching is not required again.
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => {
      console.log('ERROR', error);
      return toast.error('Email or Password Incorrect. Try Again.');
    },
  });

  return { logIn, isLoading };
};

export default useLogin;
