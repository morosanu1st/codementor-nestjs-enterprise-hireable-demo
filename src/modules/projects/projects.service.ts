import { randomUUID } from 'crypto';
import { Project } from './project.types';
import { CreateProjectDto } from './dto/create-project.dto';

/**
 * Service layer — business logic only.
 * Controllers stay thin; services are unit-testable without HTTP.
 * Swap the in-memory Map for a SQL repository in a real NestJS module.
 */
export class ProjectsService {
  private readonly store = new Map<string, Project>();

  list(status?: Project['status']): Project[] {
    const all = Array.from(this.store.values());
    if (!status) return all;
    return all.filter((p) => p.status === status);
  }

  findById(id: string): Project | undefined {
    return this.store.get(id);
  }

  create(dto: CreateProjectDto): Project {
    const now = new Date().toISOString();
    const project: Project = {
      id: randomUUID(),
      name: dto.name,
      status: dto.status ?? 'draft',
      ownerId: dto.ownerId,
      createdAt: now,
      updatedAt: now,
    };
    this.store.set(project.id, project);
    return project;
  }

  updateStatus(id: string, status: Project['status']): Project | undefined {
    const existing = this.store.get(id);
    if (!existing) return undefined;
    const updated: Project = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    };
    this.store.set(id, updated);
    return updated;
  }
}
