import express from 'express';
import path from 'path';
import proxy from './proxy';

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(proxy);

app.listen(port, () => {
  console.log(`Running on ${port}...`);
});
