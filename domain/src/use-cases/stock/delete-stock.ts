import { type User, UserRole } from "../../entities";
import type { Stock } from "../../entities/stock";
import type { StockService, UserService } from "../../services";
import type { DeletePayload } from "../../utils";

interface DeleteStockDeps {
  stockService: StockService;
  userService: UserService;
}

type DeleteStockPayload = DeletePayload<Stock> & {
  userId: User["id"];
};

export async function deleteStock(
  { stockService, userService }: DeleteStockDeps,
  { id, userId }: DeleteStockPayload
): Promise<void | Error> {
  const user = await userService.findById(userId);
  if (!user) return new Error(`User ${userId} not found`);

  if (user.role !== UserRole.ADMIN) {
    return new Error(`User is not ${UserRole.ADMIN}`);
  }
  const stock = await stockService.findById(id);

  if (!stock) return new Error("Stock not found");

  stockService.delete({ id });
}
