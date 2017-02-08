import express from 'express';
import path from 'path';
import proxy from './proxy';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(proxy);

app.listen(port, () => {
  console.log(`Running on ${port}...`);
});
