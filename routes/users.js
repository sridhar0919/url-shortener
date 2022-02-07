var express = require('express');
var dotenv = require('dotenv');
var crypto = require('crypto');
dotenv.config();
var router = express.Router();
const { dbUrl, mongob, MongoClient } = require('../dbConfig');
const nodemailer = require('nodemailer');
const {
  hashing,
  hashCompare,
  createJWT,
  authenticate,
} = require('../library/auth');

// create user details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sridharsurya9797@gmail.com',
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

router.get('/', async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const user = await db.collection('users').find().toArray();
    res.send({
      data: user,
      message: 'Users fetched successfully',
    });
  } catch (e) {
    console.log(e);
    res.send({
      error: e,
      message: 'Error in connection',
    });
  }
});

// register
router.post('/register', async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    let user = await db.collection('users').findOne({ email: req.body.email });
    if (user) {
      res.send({
        message: 'User already exists',
      });
    } else {
      const hash = await hashing(req.body.password);
      req.body.password = hash;
      const document = await db.collection('users').insertOne(req.body);

      const user = await db
        .collection('users')
        .findOne({ email: req.body.email });

      const token = crypto.randomBytes(64).toString('hex');

      const updateUser = await db
        .collection('users')
        .updateOne(
          { email: req.body.email },
          { $set: { isVerified: false, emailToken: token } }
        );

      const userUpdated = await db
        .collection('users')
        .findOne({ email: req.body.email });

      //send verification mail to user
      const mailOptions = {
        from: '"Verify your email" <sridharsurya9797@gmail.com>',
        to: user.email,
        subject: 'verify your email',
        html: `<h2>${userUpdated.firstName}! Thanks for registering on our site</h2>
              <h4>Please verify your email to continue...</h4>
              <a href="http://${process.env.URL}/verify-email/${userUpdated.emailToken}">Verify your email</a>`,
      };

      //sending mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Verification email sent');
        }
      });

      res.send({
        message: 'Account created',
      });
    }
  } catch (e) {
    console.log(e);
    res.send({ message: 'Failed to create user' });
  } finally {
    client.close();
  }
});

// verify user email
router.get('/verify-email/:token', async (req, res, next) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const user = await db
      .collection('users')
      .findOne({ emailToken: req.params.token });
    if (user) {
      const updateUser = await db
        .collection('users')
        .updateOne(
          { userName: user.userName },
          { $set: { isVerified: true, emailToken: null } }
        );
      res.send({
        message: 'Verified',
      });
    } else {
      res.send({
        message: 'Email is not verified',
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Incorrect token',
    });
  }
});

//login
router.post('/login', async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const user = await db
      .collection('users')
      .findOne({ email: req.body.email });
    if (user) {
      const compare = await hashCompare(req.body.password, user.password);
      if (compare === true) {
        // create token
        const token = await createJWT({
          userName: user.userName,
          email: user.email,
        });
        res.send({
          message: 'Login successful',
        });
      } else {
        res.send({
          message: 'Invalid email or password',
        });
      }
    } else {
      res.send({
        message: 'User not available',
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      message: 'Error in connection',
    });
  } finally {
    client.close();
  }
});

// forgot password
router.put('/forgot-password', async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const user = await db
      .collection('users')
      .findOne({ email: req.body.email });
    if (user) {
      const emailToken = await createJWT({
        userName: user.userName,
        email: user.email,
      });

      const updateUser = await db
        .collection('users')
        .updateOne({ email: req.body.email }, { $set: { token: emailToken } });

      const updatedUser = await db
        .collection('users')
        .findOne({ email: req.body.email });
      // sending token
      const mailOptions = {
        from: '"Reset your password" <sridharsurya9797@gmail.com>',
        to: user.email,
        subject: 'Password reset link',
        html: `<h2>${user.firstName}! Please reset your password with the below link</h2>
              <a href="http://${process.env.URL}/reset-password/${updatedUser.token}">Reset Password</a>`,
      };

      //sending mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Reset link sent successfully');
        }
      });
      res.send({
        message: 'Reset link sent successfully',
      });
    } else {
      res.send({
        message: 'No user available',
      });
    }
  } catch (e) {
    console.log(e);
  }
});

//reset password

router.put('/reset-password/:token', async (req, res) => {
  let client = await MongoClient.connect(dbUrl);
  let token = req.params.token;
  const mail = await authenticate(token);
  try {
    if (mail) {
      const hash = await hashing(req.body.passwd);
      const db = await client.db('url-shortener');
      const user = db
        .collection('users')
        .updateOne({ email: mail }, { $set: { password: hash } });
      res.send({
        message: 'Password reset successfully',
      });
    } else {
      res.send({
        message: 'Link expired',
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
