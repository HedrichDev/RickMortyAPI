import { Express } from 'express';

export function registerRoutes(app: Express) {
  app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
  });
}