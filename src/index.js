const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const httpStatus = require('http-status');
const usersRoutes = require('./users');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users', usersRoutes);


// 404
app.use((req, res, next) => {
  const err =  {
    message: 'API not found',
    status: httpStatus.NOT_FOUND,
  };
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
