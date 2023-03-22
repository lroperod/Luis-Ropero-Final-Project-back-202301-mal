import { errorHandler } from './utils/errors/error-handler.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRouter from './api/auth/auth-router.js';
import apiRouter from './api/api-router.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());
app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);
app.use(errorHandler);

export default app;
