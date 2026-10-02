/** Domain type for the Projects resource (enterprise-style naming). */
export interface Project {
  id: string;
  name: string;
  status: 'draft' | 'active' | 'archived';
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}
