// Use Express/Nest.js to create  API with the following endpoints and write a middleware to log request details (method, URL, timestamp).
// GET /books - Returns a list of books (mock data).
// POST /books - Adds a new book to the list (mock the response).

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const booksData = [{
    id: 1,
    title: "Book 1",
    author: "Author A"
},
{
    id: 2,
    title: "Book 2",
    author: "Author B"
},
{
    id: 3,
    title: "Book 3",
    author: "Author C"
}]

app.use(express.json())

const customMiddleWare = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date();
    console.log("method: ", method)
    console.log("url: ", url)
    console.log("time: ", time)
    next();
}

app.get("/books", customMiddleWare, (req, res) => {

    return res.json({
        status: true,
        data: booksData,
        message: "success message"
    }).status(200)
})

app.post("/books", (req, res) => {
    const { title, author } = req.body;
    const bookId = booksData.length + 1;
    const data = {
        id: bookId,
        title,
        author
    }
    const bookAdded = booksData.push(data);
    if (bookAdded) {
        return res.json({
            status: true,
            data: bookAdded,
            message: "success message"
        }).status(201)
    }
})







app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})



Input: grid[][] = [
    { 1, 2, 3, 4},
    { 5, 6, 7, 8},
    { 9, 10, 11, 12},
    { 13, 14, 15, 16}
]
Output: 1 2 5 3 6 9 4 7 10 13 8 11 14 12 15 16

// contextSwitching in typesript