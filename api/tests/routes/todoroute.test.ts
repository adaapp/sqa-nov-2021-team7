import request from "supertest";
import server from "../../src/server";
import { addTodo, clearTodoItems, getTodoItems } from "../../src/core/todorepository";

describe("Todo route", () => {

    const testTodoItem = {
        id: "id",
        title: "Title",
        description: "description",
        dateCreated: 1638886474740,
        dateDue: 1638886490587
    };

    beforeEach(() => {
        clearTodoItems();
    });

    describe("POST /todo", () => {
        it("can add new items to the cache", async () => {
            const res = await request(server)
                .post("/todo")
                .type("json")
                .send(testTodoItem);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status", true);
            expect(res.body).toHaveProperty("todo");
            expect(getTodoItems()).toHaveLength(1);
        });

        it("fails to add item if request is invalid", async () => {
            const item = { ...testTodoItem };
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

        it("should retrieve todo items", async () => {
            addTodo(testTodoItem);
            addTodo(testTodoItem);

            const res = await request(server)
                .get("/todo")
                .send();

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(2);
        });
    });

    describe("DELETE /todo/:id", () => {
        it("deletes an existing todo item", async () => {
            const todo = addTodo(testTodoItem)!;
            expect(getTodoItems()).toHaveLength(1);

            const res = await request(server)
                .delete(`/todo/${todo.id}`)
                .send();

            expect(res.statusCode).toBe(200);
            expect(getTodoItems()).toHaveLength(0);
            expect(res.body).toStrictEqual({
                status: true,
                id: todo.id
            });
        });

        it("fails to delete if item with id does not exist", async () => {
            expect(getTodoItems()).toHaveLength(0);

            const res = await request(server)
                .delete("/todo/id-does-not-exist")
                .send();

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status", false);
        });

        it("fails to delete if item with id does not exist and todo items already exist", async () => {
            const todo = addTodo(testTodoItem)!;
            addTodo(testTodoItem);
            expect(getTodoItems()).toHaveLength(2);

            const res = await request(server)
                .delete(`/todo/${todo.id}`)
                .send();

            expect(res.statusCode).toBe(200);
            expect(getTodoItems()).toHaveLength(1);
        });
    });

    describe("DELETE /", () => {
        it("should remove all todo items", async () => {
            addTodo(testTodoItem);
            addTodo(testTodoItem);
            addTodo(testTodoItem);
            expect(getTodoItems()).toHaveLength(3);

            const res = await request(server)
                .delete("/todo")
                .send();

            expect(res.statusCode).toBe(200);
            expect(getTodoItems()).toHaveLength(0);
            expect(res.body).toHaveProperty("status", true);
        });
    });

    describe("POST /todo/:id", () => {
        it("should only update the title if provided in request", async () => {
            const item = addTodo(testTodoItem);
            expect(item?.title).toBe("Title");

            const res = await request(server)
                .post(`/todo/${item?.id}`)
                .type("json")
                .send({
                    title: "Different Title"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status", true);
            expect(getTodoItems()[0].title).toBe("Different Title");
        });

        it("should only update the description if provided in request", async () => {
            const item = addTodo(testTodoItem);
            expect(item?.description).toBe("description");

            const res = await request(server)
                .post(`/todo/${item?.id}`)
                .type("json")
                .send({
                    description: "Different Description"
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status", true);
            expect(getTodoItems()[0].description).toBe("Different Description");
        });

        it("should only update the dateDue if provided in request", async () => {
            const item = addTodo(testTodoItem);
            expect(item?.dateDue).toBe(1638886490587);

            const res = await request(server)
                .post(`/todo/${item?.id}`)
                .type("json")
                .send({
                    dateDue: 1638886517175
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("status", true);
            expect(getTodoItems()[0].dateDue).toBe(1638886517175);
        });

        it("should not update fields that cannot be updated", async () => {
            const item = addTodo(testTodoItem);

            await request(server)
                .post(`/todo/${item?.id}`)
                .type("json")
                .send({
                    dateCreated: 1638886517175
                });

            expect(getTodoItems()[0].dateCreated).not.toBe(1638886517175);
        });

        it("cannot update todo item that does not exist", async () => {
            addTodo(testTodoItem);

            const res = await request(server)
                .post("/todo/id-does-not-exist")
                .type("json")
                .send({
                    title: "hi"
                });

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty("status", false);
        });
    });
});
