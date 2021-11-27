const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.json());

app.get('/', function (req, res) {
  res.render(path.resolve(__dirname, './views/index.ejs'));
});

app.get('*', function (req, res) {
  res.status(404).send(res.statusCode);
});

function errorHandler(err, req, res, next) {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };

  res.status(statusCode).send(response);
}

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
