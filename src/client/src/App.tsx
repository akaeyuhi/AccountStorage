import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import ErrorMessage from 'utils/components/ErrorMessage';
import { useAppSelector } from 'app/hooks';
import { AppRoutes, ProtectedAppRoutes } from 'utils/routes/AppRoutes';
import ProtectedRoute from 'utils/routes';

function App() {
  const navigate = useNavigate();
  const { user, token } = useAppSelector(state => state.account);

  useEffect(() => {
    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [token]);

  return <div className="container">
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />;
      })}
      {ProtectedAppRoutes.map((route, index) => {
        const { element, path, ...rest } = route;
        return <Route key={index} {...rest} element={
          <ProtectedRoute user={user} path={path}>
            {element}
          </ProtectedRoute>} />;
      })}
      <Route path='*' element={
        <main className="main main__welcome">
          <ErrorMessage error={new Error('404 not found')}/>
        </main>} />
    </Routes>
  </div>;
}

export default App;
