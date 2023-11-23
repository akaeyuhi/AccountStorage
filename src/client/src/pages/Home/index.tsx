import React from 'react';
import { useAppSelector } from 'app/hooks';

export default function HomePage() {
  const { user } = useAppSelector(state => state.account);

  return <main className="main">
    <div className="main__info">
      <h2 className="main__text">User info</h2>
      <p className="main__text">Email: { user?.email ?? '' }</p>
      <p className="main__text">Role: { user?.role ?? '' }</p>
    </div>
  </main>;
}
