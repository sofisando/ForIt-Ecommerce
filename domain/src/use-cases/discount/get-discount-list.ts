import { DiscountService } from "../../repos";

interface GetDiscountListDeps {
    discountService: DiscountService;
}

export async function getDiscountList({ discountService }: GetDiscountListDeps) {
    const discounts = await discountService.findAll();
    return discounts;
}