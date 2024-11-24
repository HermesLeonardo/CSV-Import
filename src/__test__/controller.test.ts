import { importCsv } from "../controllers/csv-import-controller";
import fs from "fs";
import { Response } from "express";

jest.mock("fs");

describe("importCsv", () => {
    it("deve retornar status 200 ao importar o CSV com sucesso", async () => {
        // Mock do fs.createReadStream para simular sucesso
        const mockReadStream: any = {
            pipe: jest.fn().mockReturnThis(),
            on: jest.fn((event: string, callback: () => void) => {
                if (event === "end") callback();
                return mockReadStream;
            }),
        };
        (fs.createReadStream as jest.Mock).mockReturnValue(mockReadStream);

        const req = {} as any;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        } as Partial<Response> as Response;

        // Chama a função e verifica o resultado
        await importCsv(req, res);

        // Verifica se status e send foram chamados com os valores corretos
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("CSV importado com sucesso!");
    });
});
