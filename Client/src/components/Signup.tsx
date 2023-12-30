import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../service';
import './styles/Signup.css'; // Import the styling

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string()
        .test('passwords-match', 'Passwords must match', function (value) {
          return value === this.parent.password || value === null;
        })
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signup(values);

        if (response.status) {
          toast.success('Account created successfully. Please login.');
          navigate('/');
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('Unable to create an account');
      }
    },
  });

  return (
    <div className='form'>
    <div className="form-container">
      <h2 className="text-center mb-4">Signup</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="label-wrapper mb-4">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field border"
          />
          {formik.touched.username && formik.errors.username && (
            <p className="error-message">{formik.errors.username}</p>
          )}
        </div>
        <div className="label-wrapper mb-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field border"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error-message">{formik.errors.password}</p>
          )}
        </div>
        <div className="label-wrapper mb-4">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field border"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="error-message">{formik.errors.confirmPassword}</p>
          )}
        </div>
        <div className="button-container">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full">
            Signup
          </button>
        </div>
      </form>
      <div className="link-container pt-4">
        <Link to="/login" className="text-blue-400">
          Already have an account? Login here
        </Link>
      </div>
    </div>
    </div>
  );
};

export default SignupPage;
