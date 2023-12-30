// client/src/components/LoginPage.tsx
import React, { useState } from 'react';
import { login } from '../service';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './styles/Login.css'; // Import the styling

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newFormErrors = { username: '', password: '' };

    if (!formData.username.trim()) {
      newFormErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.password.trim()) {
      newFormErrors.password = 'Password is required';
      valid = false;
    }

    setFormErrors(newFormErrors);

    if (valid) {
      try {
        let response = await login(formData);

        if (response.status) {
          localStorage.setItem('authToken', response.data);
          toast.success("Login Successfully!");
          navigate('/');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Unable to login');
      }
    }
  };

  return (
    <div className='form'>
    <div className="form-container">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="label-wrapper mb-4">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input-field border"
          />
          {formErrors.username && <p className="error-message">{formErrors.username}</p>}
        </div>
        <div className="label-wrapper mb-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input-field border"
          />
          {formErrors.password && <p className="error-message">{formErrors.password}</p>}
        </div>
        <div className="button-container">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
            Login
          </button>
        </div>
      </form>
      <div className="link-container pt-4">
        <Link to="/signup" className="text-blue-400">
          Don't have an account? Signup here
        </Link>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
