import request from "supertest";
import server from "../../src/server";
import { addTodo, getTodoItems } from "../../src/core/todorepository";

describe("Todo route", () => {

    const testTodoItem = {
        title: "Title",
        description: "description",
        dateCreated: new Date(),
        dateDue: new Date()
    };

    describe("POST /todo", () => {
        it("can add new items to the cache", async () => {
            const res = await request(server)
                .post("/todo")
                .type("json")
                .send(testTodoItem);

            expect(res.statusCode).toBe(200);
            expect(res.body).toStrictEqual({ status: true });
            expect(getTodoItems()).toHaveLength(1);
        });

        it("fails to add item if request is invalid", async () => {
            const item = testTodoItem;
            item.title = "";

            const res = await request(server)
                .post("/todo")
                .type("json")
                .send(item);

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status", false);
        });
    });

    describe("GET /todo", () => {
        it("should return empty array if no todo items created", async () => {
            const res = await request(server)
                .get("/todo")
                .send();

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(0);
        });

        it("should todo items", async () => {
            addTodo(testTodoItem);
            addTodo(testTodoItem);

            const res = await request(server)
                .get("/todo")
                .send();

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
        });
    });
});
