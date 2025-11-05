import { Entity } from "./entity";

/**
 * Para crear una nueva entidad.
 * Excluye campos como `id`, timestamps, etc.
 */
export type CreatePayload<T extends Entity> = Omit<T, "id">;

/**
 * Para actualizar una entidad existente.
 * Todos los campos (excepto id) son opcionales.
 */
export type UpdatePayload<T extends Entity> = Partial<Omit<T, "id">> & {
  id: T["id"];
};

/**
 * Para eliminar una entidad.
 * Generalmente sólo se necesita el id.
 */
export type DeletePayload<T extends Entity> = Pick<T, "id">;
