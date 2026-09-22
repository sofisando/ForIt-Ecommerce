//no se hace un createCartDTO porque no se le pasan items al crear el carrito
// no se hace un getCartsDTO porque no es común filtrar acá, acá se filtraría por productos que tiene un carrito que todavia no se compra... por lo menos ahora no me sirve, depsues puede ser.

export interface DeleteCartDTO {
  id: string;
}

export interface getCartByUserIdDTO {
  userId: string;
}

// mepa que update de carrito no, sino que se va deleteando los items, agregando o limpiando el carrito y listo

export interface AddItemToCartDTO {
  productId: string;
  quantity: number;
  // variant? : string;
}

export interface CartItemResponseDTO {
  productId: string;
  // variantId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  // finalPrice: number;
  // discount: number;
  subtotal: number;
}

export interface CartResponseDTO {
  id: string;
  userId: string;
  totalItems: number;
  total: number;
  items: CartItemResponseDTO[];
  createdAt: Date;
  updatedAt: Date;
}