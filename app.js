const express = require('express');
const cors = require('cors');
const DominosAPI = require('./src/index');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  const response = await DominosAPI.getStoreMenu('3769');
  res.send(response.Categorization);
});

app.listen(3030, () => {
  console.log('Listening on port 3030');
});
