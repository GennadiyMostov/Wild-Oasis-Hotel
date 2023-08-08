import { styled } from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  //1.) Load Authed User
  const { isLoading, user, isAuthenticated } = useUser();

  //3.) If there is NO authed user, redirect to the /login page

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  //2.) While loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.) If there IS a user, render the app.

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
