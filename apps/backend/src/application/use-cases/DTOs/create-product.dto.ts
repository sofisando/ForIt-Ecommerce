export interface CreateProductDTO {
  userId: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  categoryId: string;
}