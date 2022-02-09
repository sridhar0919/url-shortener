import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import ForgotPwd from './components/ForgotPwd';
import Urlshort from './components/Urlshort';
import ResetPassword from './components/ResetPassword';
import Verifyuser from './components/Verifyuser';

const routing = (
  <Router>
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/forgot-password" element={<ForgotPwd />} />
      <Route exact path="/reset-password/:token" element={<ResetPassword />} />
      <Route exact path="/verify-email/:token" element={<Verifyuser />} />
      <Route exact path="/url-shortener" element={<Urlshort />} />
    </Routes>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
