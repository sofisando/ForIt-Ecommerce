import type { Entity } from "./entity.js";
import type {
  CreatePayload,
  UpdatePayload,
  DeletePayload,
} from "./payload.js"; // o desde donde lo tengas

export interface Service<TEntity extends Entity>
  extends ServiceQuery<TEntity>,
    ServiceStorage<TEntity> {}

interface ServiceQuery<TEntity extends Entity> {
  findById: (id: string) => Promise<TEntity | null>;
  findAll: () => Promise<TEntity[]>;
}

interface ServiceStorage<TEntity extends Entity> {
  create: (data: CreatePayload<TEntity>) => Promise<TEntity>;
  editOne: (data: UpdatePayload<TEntity>) => Promise<TEntity>;
  delete: (data: DeletePayload<TEntity>) => Promise<void>;
}
