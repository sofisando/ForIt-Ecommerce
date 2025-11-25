import { describe, test, expect} from "vitest";
import { MockedVariantService } from "../../services/mocks/mock-variant-service";
import { variantMock } from "../../entities/mocks/variant-mock";
import { getVariantList } from "./get-variant-list";

describe("getVariantList", async() => {
    test("Should return a array of variants", async () => {
        const variantService = new MockedVariantService([
            variantMock(),
            variantMock()
        ]) //acá ejecutamos el constructor del Mock de servicio y le metemos Mocks de usuario
        const result = await getVariantList(
            { variantService }
        );
        expect(result).toHaveLength(2);
        expect(result).toStrictEqual(variantService.variants);
    });
    test("if there are no variants you should return an empty list", async () => {;
        const variantService = new MockedVariantService([])
        const result = await getVariantList(
            { variantService }
        );
        expect(result).toHaveLength(0);
        expect(result).toStrictEqual([]);
    });
});