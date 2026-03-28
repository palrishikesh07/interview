//Imagine we have a Book Collection and we want to print all books.

class BookCollection {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }
}

const library = new BookCollection();

library.addBook("JavaScript Guide");
library.addBook("Desing Pattens");
library.addBook("Node.js Handbook");

// Client accessing internal structure
for (let i = 0; i < library.books.length; i++) {
    console.log(library.books[i]);
}

/*
Problem Here 🚨
Issues:
❌ Client depends on internal data structure
❌ If array changes to Map / LinkedList, client breaks
❌ Encapsulation violated
*/


/*

Iterator hides the internal collection structure.

Instead of:
Client → Collection Data

We do:
Client → Iterator → Collection

Client simply asks:
next()
hasNext()

*/