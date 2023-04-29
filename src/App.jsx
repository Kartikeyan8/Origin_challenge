import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './App.css';
import NormalUser from './User';
import AdminUser from './Admin';

function Parent() {
    const [userType, setUserType] = React.useState(null);
    const [pagetype, setpagetype] = React.useState(null);

const login=(values)=>{
    
  setUserType(values.userType);
  setpagetype(values.pagetype);
    console.log(values.userType);
    console.log(values.pagetype);
    //   setSubmitting(false);
    
  };
  const render=()=>{
    if(userType==='admin' && pagetype==='admin')
    {
      return <AdminUser/>
    }
    else if(userType==='admin' && pagetype==='normal')
    {
        return <NormalUser/>
    }

    
    else if(userType==='normal' && pagetype==='normal'){
        return <NormalUser/>
    }
    else {
  return <div className="error-message">Invalid user</div>;
}

  }
    //  if(values.email ==='normal@gmail' &&  values.password==='normaluser' && values.userType==='normal')
    //       {
    //         alert('normal user logged in');
    //         Navigate('/normal');
    //       }
    //       else if(values.email ==='admin@gmail' &&  values.password==='adminuser123' && values.userType==='admin')
    //       {
    //         alert('admin user logged in');
    //         <AdminUser/>
    //       }
    //       else
    //       {
    //         alert('invalid user');
    //       }
    //         console.log(JSON.stringify(values,null,1));
return (
    <div>
      {userType ? (
        // Render dashboard based on user type after successful login
        render()
      ) : (
        // Render login form
        <div className="container">
          <h1 className="header">Welcome to the Login Screen</h1>
          <Formik
            initialValues={{ email: '', password: '', userType: 'normal',pagetype:'normal' }}
            // validationSchema={Yup.object({
            //   email: Yup.string()
            //     .email('Invalid email address')
            //     .required('Email is required'),
            //   password: Yup.string()
            //     .required('Password is required')
            //     .min(8, 'Password must be at least 8 characters long'),
            // })}
            onSubmit={login}
          >
            {({  }) => (
              <Form className="formm">
                <div className="in_cont in1">
                  <label htmlFor="email" class="placeholder">Email </label> 
                        <br />
                  <Field type="email" name="email" placeholder=" " id="em" class="input"/>
                  <br />
                  <ErrorMessage name="email" />
                </div>
                <div className="in_cont in2">
                  <label htmlFor="password" class="placeholder">Password</label>
                  <br />
                  <Field type="password" name="password" id="pass" class="input"/>
                  <br />
                  <ErrorMessage name="password" />
                </div>
                <div className="in_cont in3">
                  <label htmlFor="userType" class="option" >User Type</label>
                  <br />
                  <Field as="select" name="userType" className="option_val">
                    <option value="normal">Normal User</option>
                    <option value="admin">Admin User</option>
                  </Field>
                  <br />
                  </div>
                  <div class="in_cont in3">
                  <label htmlFor="pagetype" class="option" >Page Type</label>
                  <br />
                  <Field as="select" name="pagetype" class="option_val">
                    <option value="normal">Normal </option>
                    <option value="admin">Admin</option>
                  </Field>
                  <br />
                  </div>                 
                <button class="submit" type="submit" >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
};

export default Parent;
