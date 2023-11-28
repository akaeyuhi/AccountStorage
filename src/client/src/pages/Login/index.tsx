import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loader from '../../utils/components/Loader';
import ErrorMessage from '../../utils/components/ErrorMessage';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ValidationError from 'utils/validation';
import { loginUser } from 'features/account/actions/loginUser';
import { LoginDto } from 'services/interfaces/LoginDto';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const { error, loading, token } = useAppSelector(state => state.account);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value.trim(),
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    const validationErrors = ValidationError.validate(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }
    const dto: LoginDto = { ...formData };
    dispatch(loginUser(dto));
  };
  const failedValidationStyles = {
    outline: '1px solid red',
  };

  useEffect(() => {
    if (!error && token) return navigate('/');
  }, [error, token]);

  if (loading) return <Loader />;

  return (
    <main className="main">
      <form className="main__login" onSubmit={handleSubmit}>
        <h2 className="main__welcome">Welcome</h2>
        { error && <ErrorMessage error={error} />}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="main__input"
          required
          onChange={handleChange}
          style={
            errors.some(error => error.type === 'username') ?
              failedValidationStyles :
              {}
          }
        />
        {errors.some(error => error.type === 'email') && (
          <p style={{ color: 'red', padding: '10px' }}>Invalid username</p>
        )}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="main__input"
          required
          onChange={handleChange}
          style={
            errors.some(error => error.type === 'password') ?
              failedValidationStyles :
              {}
          }
        />
        {errors.some(error => error.type === 'password') && (
          <p style={{ color: 'red', padding: '10px' }}>Invalid password</p>
        )}
        <div className="main__checkbox-container control-group">
          <label className="control control-checkbox">
            Remember me
            <input type="checkbox" name="remember" />
            <div className="control_indicator" />
          </label>
        </div>
        <p className="main__link">Don't have an account? <Link to="/register">Register!</Link></p>
        <button type="submit" className="main__submit" >Login</button>
      </form>
    </main>
  );
}
