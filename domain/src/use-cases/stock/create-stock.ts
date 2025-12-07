import type { Stock } from "../../entities/stock.js";
import { User, UserRole } from "../../entities/user.js";
import type { StockService, UserService } from "../../services";
import type { CreatePayload } from "../../utils/types/payload.js";
import type { StockIdSelector } from "../../utils/types/stockIdSelector.js";

interface CreateStockDeps {
  stockService: StockService;
  userService: UserService;
}

type CreateStockPayload = {
  userId: User["id"];
  data: CreatePayload<Omit<Stock, "productId" | "variantId">> & StockIdSelector;
};


export async function createStock(
  { stockService, userService }: CreateStockDeps,
  { userId, data }: CreateStockPayload
): Promise<Stock | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  
  if (data.variantId) {
    const found = await stockService.getByVariantAndBranch(
      data.variantId,
      data.branchId
    );
    if (found)
      return new Error(
        `This variant: ${data.variantId} is already created in this branch: ${data.branchId}`
      );
  }

  if (data.productId) {
    const found = await stockService.getByProductAndBranch(
      data.productId,
      data.branchId
    );
    if (found)
      return new Error(
        `This product: ${data.productId} already has stock in branch: ${data.branchId}`
      );
  }
  
  const stock = await stockService.create(data as unknown as CreatePayload<Stock>);

  return stock;
}
