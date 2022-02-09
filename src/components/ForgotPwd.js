import React from 'react';
import { useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import axios from 'axios';
import forgotPass from '../img/forgot-password.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPwd() {
  const [email, setEmail] = useState('');

  const sendLink = (e) => {
    axios
      .put('https://url-shortenerapi11.herokuapp.com/users/forgot-password/', {
        email: email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    toast.success('Reset password link successfully');
    e.preventDefault();
  };

  return (
    <>
      <nav class="navbar navbar-dark">
        <a class="navbar-brand ml-2" href="/">
          <i class="fas fa-book"></i>
          Back to login page
        </a>
      </nav>
      <div className="container mt-5">
        <div className="row">
          <div className=" offset-2 col-4">
            <ToastContainer />
            <img
              src={forgotPass}
              class="img-fluid "
              alt="Happy coding"
              style={{ width: '80%' }}
            />
          </div>
          <div className="col-4 mt-3">
            <h3 className="p-3 text-center">Forgot Password?</h3>
            <p className="text-center text-muted">
              Dont worry it happens.Please enter the email associated with your
              account
            </p>
            <Form onSubmit={sendLink}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  id="userEmail"
                  placeholder="enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" color="primary" block="true">
                Send link
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}