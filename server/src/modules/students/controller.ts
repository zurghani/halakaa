import * as studentsService from "./service";
import type { Handler } from "hono";

export const listStudents: Handler = async (c) => {
    const students = await studentsService.getAllStudents();
    return c.json(students);
};

// export const getBook = async (c) => {
//     const id = c.req.param("id");
//     const book = await bookService.getBookById(id);
//     return c.json(book);
// };

// export const createBook = async (c) => {
//     const body = await c.req.json();
//     const result = await bookService.createBook(body);
//     return c.json(result, 201);
// };
