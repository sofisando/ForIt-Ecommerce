import type { Entity } from "./entity.js";

export interface Repository<TEntity extends Entity>
  extends RepositoryQuery<TEntity>,
    RepositoryStorage<TEntity> {}

interface RepositoryQuery<TEntity extends Entity> {
  getById: (id: string) => Promise<TEntity | null>;
  getAll: () => Promise<TEntity[]>;
}

interface RepositoryStorage<TEntity extends Entity> {
  save(entity: TEntity): Promise<void>;
  delete: (id: string) => Promise<void>;
}
