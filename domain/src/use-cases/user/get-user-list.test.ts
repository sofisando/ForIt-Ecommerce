import { describe, test, expect} from "vitest";
import { MockedUserService } from "../../services/mocks/mock-user-service";
import { userMock } from "../../entities/mocks/user-mock";
import { getUserList } from "./get-user-list";

describe("getUserList", async() => {
    test("Should return a array of users", async () => {
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
    test("if there are no users you should return an empty list", async () => {;
        const userService = new MockedUserService([])
        const result = await getUserList(
            { userService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});