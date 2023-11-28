import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loader from '../../utils/components/Loader';
import ErrorMessage from '../../utils/components/ErrorMessage';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ValidationError, { InputFields, phoneRegex } from 'utils/validation';
import { RegisterDto } from 'services/interfaces/RegisterDto';
import { Role } from 'utils/Roles';
import { registerUser } from 'features/account/actions/registerUser';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const { error, loading, token } = useAppSelector(state => state.account);
  const [formData, setFormData] = useState<RegisterDto>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    group: '',
    variant: '',
    telephone: '',
    gender: '',
    role: Role.User
  });
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const navigate = useNavigate();
  const handleChange = (event: React.FormEvent<HTMLInputElement> | React.ChangeEvent) => {
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
    const dto: RegisterDto = { ...formData };
    dispatch(registerUser(dto));
  };
  const failedValidationStyles = {
    outline: '1px solid red',
  };

  useEffect(() => {
    if (!error && token) return navigate('/');
    console.log(error);
  }, [error]);

  if (loading) return <Loader />;

  return (
    <main className="main">
      <form className="main__login" onSubmit={handleSubmit}>
        <h2 className="main__create">Create an account</h2>
        { error && <ErrorMessage error={error} />}
        <input
          type="text"
          id={InputFields.Name}
          name={InputFields.Name}
          placeholder="Name"
          className="main__input"
          required
          onChange={handleChange}
          style={
            errors.some(error => error.type === InputFields.Name) ?
              failedValidationStyles :
              {}
          }
        />
        <input
          type="text"
          id={InputFields.Group}
          name={InputFields.Group}
          placeholder="Group"
          className="main__input"
          required
          onChange={handleChange}
          style={
            errors.some(error => error.type === InputFields.Group) ?
              failedValidationStyles :
              {}
          }
        />
        <input
          type="text"
          id={InputFields.Variant}
          name={InputFields.Variant}
          placeholder="Variant"
          className="main__input"
          required
          onChange={handleChange}
          style={
            errors.some(error => error.type === InputFields.Variant) ?
              failedValidationStyles :
              {}
          }
        />
        <input
          type="tel"
          id={InputFields.Telephone}
          name={InputFields.Telephone}
          placeholder="Telephone"
          className="main__input"
          pattern={phoneRegex.toString()}
          required
          onChange={handleChange}
          style={
            errors.some(error => error.type === InputFields.Telephone) ?
              failedValidationStyles :
              {}
          }
        />
        <select id= {InputFields.Gender}
          name= {InputFields.Gender}
          className="main__input"
          onChange={handleChange}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
          <option value='other'>Other</option>
        </select>
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
        <p className="main__link">Already have an account? <Link to="/login">Log in!</Link></p>
        <button type="submit" className="main__submit" >Register</button>
      </form>
    </main>
  );
}
