import axios from 'axios';
import React, { useState } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import signupImg from '../img/signup-image.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const enterDetails = (e) => {
    axios
      .post('https://url-shortenerapi11.herokuapp.com/users/register/', {
        userName: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      })
      .then((res) => {
        if (res.data.message === 'User already exists') {
          toast.error('User already exists!');
        } else {
          toast.success(
            'Verification email sent. Kindly click the link to activate the account'
          );
        }
      })
      .catch((error) => console.log(error));
    setUsername('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setEmail('');

    e.preventDefault();
  };

  return (
    <>
      <div className="container mt-xl-5 mt-sm-2">
        <div className="row">
          <div className="col-xl-6 col-sm-2 mt-5">
            <img
              src={signupImg}
              class="img-fluid img-content"
              alt="Happy coding"
              style={{ width: '90%' }}
            />
          </div>
          <div className="col-xl-4">
            <ToastContainer />
            <h2 className="p-3 text-center">SIGN UP</h2>
            <p className="text-center text-muted">Please enter your details</p>
            <Form onSubmit={enterDetails}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  id="userName"
                  placeholder="enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
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
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={firstName}
                  id="userFirstname"
                  placeholder="enter name"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  id="userPassword"
                  placeholder="enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" color="primary" block="true">
                Submit
              </Button>
              <p className="text-center forgot-password mt-3">
                <a className="forgot-password" href="/">
                  <h5 className="text-center">
                    Already have an account? Login
                  </h5>
                </a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
