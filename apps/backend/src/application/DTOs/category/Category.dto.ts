export interface CreateCategoryDTO {
  name: string;
}

export interface UpdateCategoryDTO {
  name: string;
}

export interface GetCategoryDTO {
  search?: string;
}

export interface GetCategoryByIdDTO {
  id: string;
}

export interface DeleteCategoryDTO {
  id: string;
}
