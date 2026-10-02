import { Router, Request, Response } from 'express';
import { ProjectsService } from './projects.service';
import { validateCreateProject } from './dto/create-project.dto';
import { Project } from './project.types';

/**
 * Controller layer — HTTP mapping only (NestJS @Controller style).
 * No business rules here; validate input → call service → map status codes.
 */
export function createProjectsController(service: ProjectsService): Router {
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    const status = req.query.status as Project['status'] | undefined;
    const allowed = ['draft', 'active', 'archived'] as const;
    if (status && !allowed.includes(status)) {
      return res.status(400).json({
        error: { message: 'status query must be draft | active | archived' },
      });
    }
    const data = service.list(status);
    return res.json({ data });
  });

  router.get('/:id', (req: Request, res: Response) => {
    const project = service.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }
    return res.json({ data: project });
  });

  router.post('/', (req: Request, res: Response) => {
    const result = validateCreateProject(req.body);
    if (!result.ok) {
      return res.status(400).json({ error: { message: 'Validation failed', details: result.errors } });
    }
    const created = service.create(result.value);
    return res.status(201).json({ data: created });
  });

  router.patch('/:id/status', (req: Request, res: Response) => {
    const status = req.body?.status as Project['status'] | undefined;
    const allowed = ['draft', 'active', 'archived'] as const;
    if (!status || !allowed.includes(status)) {
      return res.status(400).json({
        error: { message: 'body.status must be draft | active | archived' },
      });
    }
    const updated = service.updateStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ error: { message: 'Project not found' } });
    }
    return res.json({ data: updated });
  });

  return router;
}
