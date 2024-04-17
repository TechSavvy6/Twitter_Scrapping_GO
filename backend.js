// Required npm modules
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const nodemailer = require('nodemailer');
const twitter = require('twitter-api-client');

// Database connection
const pool = new pg.Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Express App
const app = express();
app.use(bodyParser.json());

// Twitter API setup
const twitterClient = new twitter.TwitterClient({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  accessToken: 'your_access_token',
  accessTokenSecret: 'your_access_token_secret',
});

// Periodically fetch data from Twitter and save to DB
setInterval(() => {
  // Fetch data from Twitter
  // Save data to PostgreSQL
}, 3600000); // Fetch every hour (3600000 milliseconds)

// Save images to local storage

// Send email when post has video

// GET API for saved posts with pagination
app.get('/posts', (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  pool.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});