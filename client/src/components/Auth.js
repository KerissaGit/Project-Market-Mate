import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

function Auth({ setUser }) {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
      ...(isLogin ? {} : {
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Required')
      })
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const endpoint = isLogin ? '/login' : '/signup';
        const response = await axios.post(endpoint, values);
        if (response.status === 200) {
          setUser(response.data);
          navigate('/');
        }
      } catch (error) {
        const msg = error.response?.data?.error || 'Something went wrong';
        setErrors({ password: msg });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="form-error">{formik.errors.username}</div>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="form-error">{formik.errors.password}</div>
        )}

        {!isLogin && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps('confirmPassword')}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="form-error">{formik.errors.confirmPassword}</div>
            )}
          </>
        )}

        <button type="submit" className="primary" disabled={formik.isSubmitting}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="auth-toggle">
        {isLogin ? (
          <span>
            Don't have an account?
            <button onClick={() => setIsLogin(false)}>Sign Up</button>
          </span>
        ) : (
          <span>
            Already have an account?
            <button onClick={() => setIsLogin(true)}>Login</button>
          </span>
        )}
      </div>
    </div>
  );
}

export default Auth;
