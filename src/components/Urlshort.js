import axios from 'axios';
import React from 'react';
import { Form, Input, Label, Button, FormGroup, Table } from 'reactstrap';
import { useState, useEffect } from 'react';
import './css/Urlshort.css';
import smallIcon from '../img/login-icon-small.png';
import { ToastContainer, toast } from 'react-toastify';

export default function Urlshort() {
  const [users, setUsers] = useState([]);
  const [fullURL, setFullURL] = useState('');

  const userList = () => {
    return axios
      .get('https://url-shortenerapi11.herokuapp.com/shorturls')
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post('https://url-shortenerapi11.herokuapp.com/short-urls/create', {
        fullUrl: fullURL,
      })
      .then((res) => {
        toast.success('URL created successfully. Find it below');
        userList();
        setFullURL('');
      })
      .catch((error) => console.log(error));
  };

  const buttonHandler = (short) => {
    axios
      .get(`https://url-shortenerapi11.herokuapp.com/${short}`)
      .then((res) => {
        if ((res.data.message = 'Success')) {
          userList();
          window.open(res.data.full, '_blank');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userList();
  }, [fullURL]);

  return (
    <div className="body-container">
      <nav class="navbar navbar-dark bg-primary ">
        <h5 class="navbar-brand ml-2 text-light title-icon">
          <img src={smallIcon} alt="icon" className="mr-2" />
          SHORTLIFY
        </h5>
        <button
          class="logout-button"
          onClick={(e) => {
            window.location.replace('/');
          }}
        >
          Logout
        </button>
      </nav>
      <ToastContainer />
      <div className="row mt-4 back-color ">
        <div className=" col-sm-2 offset-md-4 col-lg-4 col-sm-8 col-md-4 mt-4 container-sm">
          <div className="back-color">
            <h3 className="text-center title-heading1">
              <i class="fas fa-xs fa-compress-arrows-alt pr-2"></i> SIMPLIFY
              YOUR URL
            </h3>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label for="fullUrl"></Label>
                <Input
                  type="url"
                  name="fullUrl"
                  id="fullUrl"
                  className="input-field"
                  placeholder="Enter URL"
                  autoComplete="off"
                  value={fullURL}
                  required
                  onChange={(e) => setFullURL(e.target.value)}
                />
                <button className="mt-3 login-button">Shorten URL</button>
              </FormGroup>
            </Form>
          </div>
        </div>

        <div className="row mt-4 m-3 table-content">
          <div className="col-12 mt-3">
            <h4 className="mb-3 title-heading">
              <i class="fas fa-paperclip"></i> RECENT URLS
            </h4>
            <table class="table-striped table-dark">
              <thead>
                <tr className="d-flex">
                  <th>Full URL</th>
                  <th className="last1-th">Short URL</th>
                  <th className="last-th">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={index} className="d-flex">
                    <td className="irst-column">
                      <a href={item?.fullUrl} className="text-light ">
                        {item?.fullUrl}
                      </a>
                    </td>
                    <td className="click1-td">
                      <Button
                        type="submit"
                        color="link"
                        className="text-light table-content"
                        onClick={(e) => {
                          e.preventDefault();
                          buttonHandler(item?.shortUrl);
                        }}
                      >
                        http://short.lify/{item?.shortUrl}
                      </Button>
                    </td>
                    <td className="click-td">
                      <h5 className="table-content">{item?.clicks}</h5>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Table
              striped
              bordered
              hover
              className="table-dark table-hover mx-sm-3"
            >
              <thead>
                <tr>
                  <th className="w-25">Full URL</th>
                  <th>Short URL</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a href={item?.fullUrl} className="text-light ">
                        {item?.fullUrl}
                      </a>
                    </td>
                    <td>
                      <Button
                        type="submit"
                        color="link"
                        className="text-light table-content"
                        onClick={(e) => {
                          e.preventDefault();
                          buttonHandler(item?.shortUrl);
                        }}
                      >
                        http://short.lify/{item?.shortUrl}
                      </Button>
                    </td>
                    <td>
                      <h5 className="table-content">{item?.clicks}</h5>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table> */}
          </div>
        </div>
      </div>
    </div>
  );
}
