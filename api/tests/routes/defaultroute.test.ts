import request from "supertest";
import server from "../../src/server";

describe("Default route", () => {
    it("GET /", done => {
        request(server).get("/")
            .expect(200, done);
    });
});
