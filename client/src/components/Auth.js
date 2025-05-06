// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import * as yup from 'yup';

// function Auth({ setUser }) {
//   const [signUp, setSignUp] = useState(true);

//   const signupSchema = yup.object().shape({
//     username: yup.string().min(5).max(15).required('Username is required'),
//     email: yup.string().email('Invalid email').required('Email is required'),
//     password: yup.string().min(5).max(15).required('Password is required'),
//     passwordConfirmation: yup
//       .string()
//       .oneOf([yup.ref('password')], 'Passwords must match')
//       .required('Please confirm your password'),
//   });

//   const loginSchema = yup.object().shape({
//     username: yup.string().required('Username is required'),
//     password: yup.string().required('Password is required'),
//   });

//   const initialSignupValues = {
//     username: '',
//     email: '',
//     password: '',
//     passwordConfirmation: '',
//   };

//   const initialLoginValues = {
//     username: '',
//     password: '',
//   };

//   const toggleFormMode = () => setSignUp(prev => !prev);

//   const handleFormSubmit = (values) => {
//     const endpoint = signUp ? '/signup' : '/login';
//     const payload = signUp
//       ? {
//           username: values.username,
//           email: values.email,
//           password: values.password,
//         }
//       : {
//           username: values.username,
//           password: values.password,
//         };

//     fetch(endpoint, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify(payload),
//     })
//       .then(resp => {
//         if (resp.ok) {
//           resp.json().then(user => {
//             localStorage.setItem('loggedInUser', JSON.stringify(user));
//             setUser(user);
//           });
//         } else {
//           resp.json().then(err => alert(err.error || 'Authentication failed'));
//         }
//       })
//       .catch(err => console.error('Network error:', err));
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
//       <h2 style={{ textAlign: 'center' }}>
//         {signUp ? 'Create an Account' : 'Login to Your Account'}
//       </h2>

//       <button onClick={toggleFormMode} style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
//         {signUp ? 'Already have an account? Login' : 'Need an account? Sign up'}
//       </button>

//       <Formik
//         initialValues={signUp ? initialSignupValues : initialLoginValues}
//         validationSchema={signUp ? signupSchema : loginSchema}
//         onSubmit={handleFormSubmit}
//       >
//         {({ handleSubmit, values, handleChange, errors, touched }) => (
//           <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} noValidate>
//             <div>
//               <input
//                 name="username"
//                 placeholder="Username"
//                 value={values.username}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px' }}
//               />
//               {touched.username && errors.username && (
//                 <div style={{ color: 'red', fontSize: '12px' }}>{errors.username}</div>
//               )}
//             </div>

//             {signUp && (
//               <div>
//                 <input
//                   name="email"
//                   placeholder="Email"
//                   value={values.email}
//                   onChange={handleChange}
//                   style={{ width: '100%', padding: '8px' }}
//                 />
//                 {touched.email && errors.email && (
//                   <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
//                 )}
//               </div>
//             )}

//             <div>
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 value={values.password}
//                 onChange={handleChange}
//                 style={{ width: '100%', padding: '8px' }}
//               />
//               {touched.password && errors.password && (
//                 <div style={{ color: 'red', fontSize: '12px' }}>{errors.password}</div>
//               )}
//             </div>

//             {signUp && (
//               <div>
//                 <input
//                   name="passwordConfirmation"
//                   type="password"
//                   placeholder="Confirm Password"
//                   value={values.passwordConfirmation}
//                   onChange={handleChange}
//                   style={{ width: '100%', padding: '8px' }}
//                 />
//                 {touched.passwordConfirmation && errors.passwordConfirmation && (
//                   <div style={{ color: 'red', fontSize: '12px' }}>{errors.passwordConfirmation}</div>
//                 )}
//               </div>
//             )}

//             <button type="submit" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}>
//               {signUp ? 'Register' : 'Login'}
//             </button>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// }


// export default Auth;





import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

function Auth({ setUser }) {
  const [signUp, setSignUp] = useState(true);

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

  function toggleSignup() {
    setSignUp((currentSignup) => !currentSignup)
  }

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
          return resp.json().then(user => {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setUser(user);
          });
        } else {
          return resp.json().then(err =>
            alert(err.error || 'Authentication failed')
          );
        }
      })
      .catch(() => alert('Network error. Please try again.'));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>
        {signUp ? 'Create an Account' : 'Login to Your Account'}
        <button onClick={toggleSignup}>{signUp ? 'Create an Account' : 'Login to Your Account'}</button>
      </h2>

      <button 
        type="button"
        onClick={toggleFormMode}
        style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        {signUp ? 'Already have an account? Login' : 'Need an account? Sign up'}
      </button>

      <Formik
        enableReinitialize
        initialValues={signUp ? initialSignupValues : initialLoginValues}
        validationSchema={signUp ? signupSchema : loginSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, values, handleChange, errors, touched }) => (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} noValidate>
            <input
              name="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              style={{ padding: '8px' }}
            />
            {touched.username && errors.username && (
              <div style={{ color: 'red', fontSize: '12px' }}>{errors.username}</div>
            )}

            {signUp && (
              <>
                {/* <label htmlFor='user'>Email:</label> */}
                  <input
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    style={{ padding: '8px' }}
                  />
                  {touched.email && errors.email && (
                    <div style={{ color: 'red', fontSize: '12px' }}>{errors.email}</div>
                  )}
              </>
            )}

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              style={{ padding: '8px' }}
            />
            {touched.password && errors.password && (
              <div style={{ color: 'red', fontSize: '12px' }}>{errors.password}</div>
            )}

            {signUp && (
              <>
                <input
                  name="passwordConfirmation"
                  type="password"
                  placeholder="Confirm Password"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  style={{ padding: '8px' }}
                />
                {touched.passwordConfirmation && errors.passwordConfirmation && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{errors.passwordConfirmation}</div>
                )}
              </>
            )}

            <button
              type="submit"
              style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none' }}
            >
              {signUp ? 'Register' : 'Login'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Auth;
