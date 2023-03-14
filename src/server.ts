import app from './app.js';
import dotenv from 'dotenv';
import log from './logger.js';

dotenv.config();

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  log.info(`Server started in port ${port}`);
});
