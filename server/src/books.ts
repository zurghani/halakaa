import { Hono } from "hono";

const book = new Hono();

book.get("/", (c) => c.text("List Books")); // GET /book

book.get("/:id", (c) => {
    // GET /book/:id?page=1
    const page = c.req.query("page");
    const { id } = c.req.param();
    return c.text("Get Book: " + id);
});

book.post("/", (c) => c.text("Create Book")); // POST /book

export default book;
