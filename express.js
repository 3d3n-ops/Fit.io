import express from 'express';
import bodyParser from 'body-parser';
import destroy from 'node_modules\destroy\index.js';

// Create an instance of express
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Express route working!' });
});

// A POST route to demonstrate body parsing
app.post('/api/post-test', (req, res) => {
  const { body } = req;
  res.status(200).json({ message: 'Data received', data: body });
});

// Exporting express app to work with Next.js API routes
export default (req, res) => {
  app(req, res);
};

