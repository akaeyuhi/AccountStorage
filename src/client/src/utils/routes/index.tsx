import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from 'utils/Roles';
import { AuthUser } from 'features/account/types/AuthUser';

interface Props {
  user: AuthUser | null,
  path: string
  children: React.FunctionComponent | React.JSX.Element
}


const ProtectedRoute = ({ user, path, children }: Props) => {
  // console.log(typeof children);
  // const memorized = memo(children as React.FunctionComponent);
  if (!user) {
    return <Navigate to='/login' replace />;
  } else if (path === '/admin' && user.role !== Role.Admin) {
    alert('You have no access to this page. Returning to Home.');
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
};


export default memo(ProtectedRoute);
