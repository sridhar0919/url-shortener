import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  InputGroupText,
  InputGroup,
} from 'reactstrap';
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
      <div className="container mt-xl-4 mt-sm-1 rounded">
        <ToastContainer />
        <div className="row justify-content-center align-items-center d-sm-flex flex-column-sm">
          <div className="col-xl-6 col-sm-2 mt-5 back-color">
            <img
              src={loginImg}
              class="img-fluid img-content"
              alt="Happy coding"
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-xl-4 col-sm-6">
            <h3 className="text-center title-web mb-4">
              <img src={loginIcon} alt="icon" className="d-inline icon-title" />
              SHORTLIFY
            </h3>
            <h5 className="text-center sub-text mb-4">Welcome..!</h5>
            <form>
              <div class="form-row align-items-center">
                <div class="col-12 my-1 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <i className="far fa-envelope input-icon fa-xs"></i>
                      </div>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      class="form-control"
                      autoComplete="off"
                      id="userEmail"
                      placeholder="Email id"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div class="col-12 my-1 mb-3">
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <div class="input-group-text ">
                        <i className="fas fa-unlock-alt fa-xs"></i>
                      </div>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      autoComplete="off"
                      class="form-control"
                      id="inlineFormInputGroupUsername"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <p className="forgot-password w-100">
                  <a href="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </a>
                </p>
                <div className="text-center w-100">
                  <button
                    className="login-button"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn();
                    }}
                  >
                    Login
                  </button>
                </div>

                <p className="text-center forgot-password mt-4">
                  <a className="forgot-password" href="/signup">
                    <h5 className="bottom-text">
                      Not registered yet? Create an account
                    </h5>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
