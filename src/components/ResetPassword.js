import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import resetPass from '../img/reset-password.png';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const resetPwd = (e) => {
    if (password === confirmPassword) {
      axios
        .put(
          `https://url-shortenerapi11.herokuapp.com/users/reset-password/${token}`,
          {
            passwd: password,
          }
        )
        .then((res) => {
          console.log(res);

          navigate('/');
        })
        .catch((err) => console.log(err));
      toast.success('Password reset successfully');
    } else {
      toast.warning('Password does not match.Kindly enter again');
    }
    e.preventDefault();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* <div className="offset-lg-4 offset-sm-2 offset-md-4 col-lg-4 col-sm-8 col-md-4 bg-light mt-5 p-3   container-sm"> */}
          <div className=" offset-2 col-4 mt-5">
            <ToastContainer />
            <img
              src={resetPass}
              class="img-fluid "
              alt="Happy coding"
              style={{ width: '80%' }}
            />
          </div>
          <div className="col-4 mt-5">
            <h3 className="p-3 text-center">Enter new password</h3>
            <Form onSubmit={resetPwd}>
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
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={confirmPassword}
                  id="userPassword"
                  placeholder="re-enter password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" color="primary" block="true">
                Reset
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
