import { CartItem } from "@forit/domain";

export interface CreateCartDTO {
  //no le pongo el userId para que lo saque del middleware
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// no se hace un getCartsDTO porque no es común filtrar acá, acá se filtraría por productos que tiene un carrito que todavia no se compra... por lo menos ahora no me sirve, depsues puede ser.

export interface GetCartByIdDTO {
  id: string;
}

export interface DeleteCartDTO {
  id: string;
}

export interface getCartByUserId {
  userId: string;
}

// mepa que update de carrito no, sino que se va deleteando los items, agregando o limpiando el carrito y listo
