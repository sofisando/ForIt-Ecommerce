import { DiscountService } from "../../services";

interface GetDiscountListDeps {
    discountService: DiscountService;
}

export async function getDiscountList({ discountService }: GetDiscountListDeps) {
    const discounts = await discountService.findAll();
    return discounts;
}