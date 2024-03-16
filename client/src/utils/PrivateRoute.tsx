import { getAccessToken } from "src/utils/localStorage"
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: JSX.Element
}

export const PrivateRoute = ({ component }: PrivateRouteProps) => {
  const accessToken = getAccessToken();

  return accessToken ? component : <Navigate to="/login" />;
}