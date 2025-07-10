// import * as bookService from "./service.ts";

export const listStudents = async (c: any) => {
    // const books = await bookService.getAllBooks();
    return c.json({ message: "List Students" });
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
