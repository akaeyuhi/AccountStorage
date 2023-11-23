import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router';
import LoginPage from 'pages/Login';
import ErrorMessage from 'utils/components/ErrorMessage';
import { useAppSelector } from 'app/hooks';
import HomePage from 'pages/Home';

function App() {
  const navigate = useNavigate();
  const { token } = useAppSelector(state => state.account);

  useEffect(() => {
    if (token) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [token]);

  return <div className="container">
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={
        <main className="main main__welcome">
          <ErrorMessage error={new Error('404 not found')}/>
        </main>} />
    </Routes>
  </div>;
}

export default App;
