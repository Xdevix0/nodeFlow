import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import websocket from '@fastify/websocket';

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

await app.register(jwt, {
  secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
});

await app.register(websocket);

app.get('/health', async (req, reply) => {
  return { status: 'ok', time: new Date().toISOString() };
});


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

try {
  await app.listen({ port: PORT, host: HOST });
  console.log(`Server running on http://${HOST}:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
