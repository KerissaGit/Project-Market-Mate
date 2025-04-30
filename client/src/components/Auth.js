import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

function Auth({ setUser }) {
  const [signUp, setSignUp] = useState(true);

  // Validation schemas
  const signupSchema = yup.object().shape({
    username: yup.string().min(5).max(15).required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(5).max(15).required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const initialSignupValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const initialLoginValues = {
    username: '',
    password: '',
  };

  const toggleFormMode = () => setSignUp(prev => !prev);

  const handleFormSubmit = (values) => {
    const endpoint = signUp ? '/signup' : '/login';
    const payload = signUp
      ? {
          username: values.username,
          email: values.email,
          password: values.password,
        }
      : {
          username: values.username,
          password: values.password,
        };

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(user => {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setUser(user);
          });
        } else {
          resp.json().then(err => alert(err.error || 'Authentication failed'));
        }
      })
      .catch(err => console.error('Network error:', err));
  };


  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        {signUp ? 'Create an Account' : 'Login to Your Account'}
      </Typography>

      <Button variant="text" onClick={toggleFormMode} sx={{ mb: 2 }}>
        {signUp ? 'Already have an account? Login' : 'Need an account? Sign up'}
      </Button>

      <Formik
        initialValues={signUp ? initialSignupValues : initialLoginValues}
        validationSchema={signUp ? signupSchema : loginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              name="username"
              label="Username"
              fullWidth
              value={values.username}
              onChange={handleChange}
              error={touched.username && Boolean(errors.username)}
              helperText={touched.username && errors.username}
            />

            {signUp && (
              <TextField
                name="email"
                label="Email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            )}

            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            {signUp && (
              <TextField
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                fullWidth
                value={values.passwordConfirmation}
                onChange={handleChange}
                error={touched.passwordConfirmation && Boolean(errors.passwordConfirmation)}
                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              />
            )}

            <Button type="submit" variant="contained" color="primary">
              {signUp ? 'Register' : 'Login'}
            </Button>
          </Box>
        )}
      </Formik>
    </Container>
  );
}

export default Auth;





// import React, { useState } from "react";
// import { Formik, FieldArry } from 'formik';
// import * as yup from 'yup';

// function Auth(){


//     const handleFormSubmit = (values) => {
//         const endpoint = signup ? '/signup' : '/login';
      
//         const payload = signup
//           ? {
//               username: values.username,
//               email: values.email,
//               password: values.password,
//             }
//           : {
//               username: values.username,
//               password: values.password,
//             };
      
//         fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include', // required for session cookies
//           body: JSON.stringify(payload),
//         })
//           .then((resp) => {
//             if (resp.ok) {
//               return resp.json();
//             }
//             throw new Error('Auth failed');
//           })
//           .then((user) => {
//             localStorage.setItem('loggedInUser', JSON.stringify(user));
//             setUser(user); // Update to match your state key
//           })
//           .catch((err) => {
//             console.error(err.message);
//           });
//       };
      


// }


// export default Auth;

