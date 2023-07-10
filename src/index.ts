import express from 'express';
import db from './models';
import ENVIRONMENT from './config/environment';
import root from './shared/root';

const PORT = +(ENVIRONMENT.PORT ?? 3001);

db.sequelize.sync();

const app = express();

app.listen(PORT, () => {
  console.log(`Sever are running @ ${PORT}`);
});

root(app);
