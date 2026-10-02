import express from 'express';
import { ProjectsService } from './modules/projects/projects.service';
import { createProjectsController } from './modules/projects/projects.controller';

/**
 * Bootstrap — mirrors NestJS main.ts + AppModule wiring.
 * One resource module: Projects (controller → service → DTO).
 */
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

const projectsService = new ProjectsService();
app.use('/api/projects', createProjectsController(projectsService));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', pattern: 'controller-service-dto' });
});

app.get('/', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Enterprise Nest-style demo</title></head>
<body style="font-family:system-ui;max-width:40rem;margin:2rem auto;padding:0 1rem">
  <h1>Projects API (Nest-style layers)</h1>
  <p>Controller → Service → DTO validation. Try:</p>
  <pre>curl -s http://localhost:${PORT}/api/projects
curl -s -X POST http://localhost:${PORT}/api/projects \\
  -H 'Content-Type: application/json' \\
  -d '{"name":"Payments API","ownerId":"eng-42"}'</pre>
  <p><a href="/health">/health</a></p>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Enterprise hireable demo listening on http://localhost:${PORT}`);
  console.log('GET  /api/projects');
  console.log('POST /api/projects  { "name", "ownerId", "status?" }');
});
