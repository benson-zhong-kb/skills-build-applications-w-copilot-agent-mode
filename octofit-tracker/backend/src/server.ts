import express from 'express';
import './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const resources = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
};

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

Object.entries(resources).forEach(([resource, model]) => {
  app.get(`/api/${resource}/`, async (_request, response, next) => {
    try {
      const data = await model.find().lean();
      response.json({ resource, data });
    } catch (error) {
      next(error);
    }
  });
});

app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});