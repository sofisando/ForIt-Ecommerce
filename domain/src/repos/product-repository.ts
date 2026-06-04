import { Product } from "../entities/product.js";
import type { Repository } from "../utils/types/repository.js";

export interface ProductRepository extends Repository<Product> {

  //me quedó vacio lpm jajjaja bueno pero quizas el getAll no sea igual en todos(?


  // findByIds(ids: string[]): Promise<Product[]>; parece que era para traer productos de un carrito, pero para eso traigo los productos de un determinado carrito, seria del repositorio del carrito no de producto
}

// apply-discount-to-product.ts  en use-cases