var express = require('express');
var router = express.Router();
var shortid = require('shortid');
const { dbUrl, mongob, MongoClient } = require('../dbConfig');
/* GET home page. */
router.get('/shorturls', async (req, res, next) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const urlLinks = await db.collection('urls').find().toArray();
    res.send({
      data: urlLinks,
    });
  } catch (error) {
    res.send({
      data: error,
    });
  }
});

router.post('/short-urls/create', async (req, res) => {
  let client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const newShorturl = shortid.generate();
    const link = await db.collection('urls').insertOne({
      fullUrl: req.body.fullUrl,
      shortUrl: newShorturl,
      clicks: 0,
    });

    res.send({
      message: 'Short url created successfully',
    });
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
});

router.get('/:shortUrl', async (req, res) => {
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('url-shortener');
    const shortUrl = await db
      .collection('urls')
      .findOne({ shortUrl: req.params.shortUrl });

    const updateClick = await db
      .collection('urls')
      .updateOne({ shortUrl: req.params.shortUrl }, { $inc: { clicks: 1 } });
    res.send({
      full: shortUrl.fullUrl,
      message: 'Success',
    });
  } catch (e) {
    res.send({
      message: 'Error in connection',
    });
  }
});

module.exports = router;
