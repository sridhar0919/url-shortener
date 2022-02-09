import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroupText,
  InputGroup,
} from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import loginImg from '../img/login-image.png';
import loginIcon from '../img/outline_done_all_black_24dp.png';
import './css/Homepage.css';

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = () => {
    console.log(email, password);
    axios
      .post('https://url-shortenerapi11.herokuapp.com/users/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.message === 'Login successful') {
          navigate('/url-shortener');
        } else {
          toast.error('Invalid username or password');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container mt-4 rounded">
        <div className="row justify-content-center align-items-center">
          <div className="col-6 mt-5 back-color">
            <img
              src={loginImg}
              class="img-fluid img-content"
              alt="Happy coding"
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-4">
            <h3 className="text-center title-web mb-4">
              <img src={loginIcon} alt="icon" className="d-inline" />
              SHORTLIFY
            </h3>
            <h5 className="text-center mb-4">Welcome..!</h5>
            <Form onSubmit={signIn}>
              <ToastContainer />
              <FormGroup>
                <InputGroup>
                  <InputGroupText>
                    <i className="far fa-envelope"></i>
                  </InputGroupText>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    id="userEmail"
                    placeholder="username"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup>
                  <InputGroupText>
                    <i className="fas fa-unlock-alt"></i>
                  </InputGroupText>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    id="userPassword"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <p className="forgot-password">
                <a href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </a>
              </p>
              <Button
                color="primary"
                block="true"
                onClick={(e) => {
                  signIn();
                }}
              >
                Login
              </Button>
              <p className="text-center forgot-password mt-4">
                <a className="forgot-password" href="/signup">
                  <h5>Not registered yet? Create an account</h5>
                </a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
