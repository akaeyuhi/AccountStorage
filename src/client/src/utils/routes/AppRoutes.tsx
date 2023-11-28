import React from 'react';
import LoginPage from 'pages/Login';
import RegisterPage from 'pages/Register';
import HomePage from 'pages/Home';

const AppRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },

];

const ProtectedAppRoutes = [
  {
    path: '/',
    index: true,
    element: <HomePage />,
  },
  // {
  //   path: '/admin',
  //   index: true,
  //   element: <AdminPage />,
  // },
];

export { AppRoutes, ProtectedAppRoutes };
