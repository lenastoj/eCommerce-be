import createApp from '@app/app';
import '@services/database.service';
import path from 'path';

const app = createApp();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  console.log('dirname', path.join(process.cwd(), 'public'));
});
