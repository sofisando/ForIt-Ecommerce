import { CategoryService } from "../../services/category-service";

interface GetCategoryListDeps {
    categoryService: CategoryService;
}

export async function getCategoryList({ categoryService }: GetCategoryListDeps) {
    const categorys = await categoryService.findAll();
    return categorys;
}