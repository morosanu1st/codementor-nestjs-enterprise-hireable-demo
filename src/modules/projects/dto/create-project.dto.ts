/**
 * DTO validation sketch — in NestJS this would be a class with
 * class-validator decorators (@IsString, @IsNotEmpty, @IsIn, …).
 * Here we keep a plain validate() so the demo runs with zero heavy deps.
 */

export interface CreateProjectDto {
  name: string;
  ownerId: string;
  status?: 'draft' | 'active' | 'archived';
}

export type ValidationResult =
  | { ok: true; value: CreateProjectDto }
  | { ok: false; errors: string[] };

const STATUSES = new Set(['draft', 'active', 'archived']);

export function validateCreateProject(body: unknown): ValidationResult {
  const errors: string[] = [];
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: ['Body must be a JSON object'] };
  }
  const b = body as Record<string, unknown>;

  if (typeof b.name !== 'string' || b.name.trim().length === 0) {
    errors.push('name: required non-empty string');
  } else if (b.name.trim().length > 120) {
    errors.push('name: max 120 characters');
  }

  if (typeof b.ownerId !== 'string' || b.ownerId.trim().length === 0) {
    errors.push('ownerId: required non-empty string');
  }

  let status: CreateProjectDto['status'] = 'draft';
  if (b.status !== undefined) {
    if (typeof b.status !== 'string' || !STATUSES.has(b.status)) {
      errors.push('status: must be draft | active | archived');
    } else {
      status = b.status as CreateProjectDto['status'];
    }
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name: (b.name as string).trim(),
      ownerId: (b.ownerId as string).trim(),
      status,
    },
  };
}
