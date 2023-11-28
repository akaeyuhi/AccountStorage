import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'features/account/accountSlice';
import { loadUser } from 'features/user/actions/loadUser';
import Loader from 'utils/components/Loader';
import { useNavigate } from 'react-router';
import ErrorMessage from 'utils/components/ErrorMessage';
import { Link } from 'react-router-dom';
import { Role } from 'utils/Roles';

export default function HomePage() {
  const savedUser = useAppSelector(state => state.account.user);
  const { user, loading, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userLogout = () => dispatch(logout());

  useEffect(() => {
    if (savedUser) dispatch(loadUser(savedUser.id));
    else return navigate('/login');
  }, []);

  if (error) return <main className="main"><ErrorMessage error={error}/></main>;
  if (loading) return <Loader />;

  return <main className="main">
    <div className="main__info">
      <h2 className="main__text">User info</h2>
      <p className="main__text">ID: { user?.id ?? '' }</p>
      <p className="main__text">Name: { user?.name ?? '' }</p>
      <p className="main__text">Email: { user?.email ?? '' }</p>
      <p className="main__text">Group: { user?.group ?? '' }</p>
      <p className="main__text">Variant: { user?.variant ?? '' }</p>
      <p className="main__text">Gender: { user?.gender ?? '' }</p>
      <p className="main__text">Telephone: { user?.telephone ?? '' }</p>
      <p className="main__text">Role: { user?.role ?? '' }</p>
      { user?.role === Role.Admin ?
        <Link to="/admin" className="main__link">To admin settings</Link> : ''}
      <button className="main__submit" onClick={userLogout}>Logout</button>
    </div>
  </main>;
}
