import request from "supertest";
import server from "../../src/server";

describe("Default route", () => {
    it("GET /", async () => {
        const res = await request(server)
            .get("/");
        expect(res.statusCode).toBe(200);
    });
});
