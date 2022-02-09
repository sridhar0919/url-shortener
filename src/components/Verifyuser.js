import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Verifyuser() {
  const { token } = useParams();
  console.log(token);
  const verifyUser = (e) => {
    axios
      .get(
        `https://url-shortenerapi11.herokuapp.com/users/verify-email/${token}`
      )
      .then((res) => {
        console.log(res);
        toast.success('Email Verified. Account activated successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Link expires');
      });
    e.preventDefault();
  };
  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1>Click on the below button to verify</h1>
      <Button
        className="mt-3 text-center"
        type="submit"
        color="primary"
        onClick={verifyUser}
      >
        Verify user
      </Button>
    </div>
  );
}
