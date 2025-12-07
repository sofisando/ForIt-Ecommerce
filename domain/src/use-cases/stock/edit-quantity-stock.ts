import { type User, UserRole } from "../../entities";
import type { Stock } from "../../entities/stock";
import type { StockService, UserService } from "../../services";
import type { StockIdSelector } from "../../utils/types/stockIdSelector";

interface EditStockDeps {
  stockService: StockService;
  userService: UserService;
}

interface EditStockPayload {
  userId: User["id"];
  data: {
    branchId: string | null;
    quantity: number;
  } & StockIdSelector;
}


export async function editStock(
  { stockService, userService }: EditStockDeps,
  { userId, data }: EditStockPayload
): Promise<Stock | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }

  let stock: Stock | null = null;

  if (typeof data.variantId !== "undefined") {
    stock = await stockService.getByVariantAndBranch(
      data.variantId,
      data.branchId
    );
  } else {
    stock = await stockService.getByProductAndBranch(
      data.productId,
      data.branchId
    );
  }

  if (!stock) {
    return new Error("Stock not found");
  }

  const stockUpdated = await stockService.editOne({
    id: stock.id,
    quantity: data.quantity,
  });

  return stockUpdated;
}

