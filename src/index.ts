import { SetupServer } from './server';

const server = new SetupServer();
server.init();

server.app.listen(3333, () => {
  console.log('🍔 Running on port 3333');
});
