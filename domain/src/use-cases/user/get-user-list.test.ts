import { describe, test, expect} from "vitest";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { getUserList } from "./get-user-list";

describe("getUserList", async() => {
    test("cuando se llame debería traer la lista de usuarios", async () => {
        const userService = new MockedUserService([
            userMock(),
            userMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getUserList(
            { userService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(userService.users);
    });
    test("si no hay usuarios debería devolver una lista vacía", async () => {;
        const userService = new MockedUserService([])
        const result = await getUserList(
            { userService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});