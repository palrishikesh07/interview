//Iterator Pattern provides a way to access elements of a collection sequentially without exposing its internal structure.
/*
Very common examples.

Playlist
Playlist → Iterator → Songs


User presses:
next()
previous()


Browser History
History → Iterator

Buttons:
Next
Previous


JavaScript Built-in Iterators

Example:

const arr = [1,2,3];

for (const item of arr) {
  console.log(item);
}

Internally:
arr[Symbol.iterator]()
This is Iterator Pattern.
*/

// const arr = [1, 2, 3];
// console.log(arr[Symbol.iterator]().forEach(element => {
//     console.log(element)
// }))


// We will build a Custom Book Iterator.
//Step 1 — Collection

class BookCollection {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    createIterator() {
        return new BookIterator(this.books);
    }
}

//Step 2 — Iterator

class BookIterator {
    constructor(books) {
        this.books = books;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.books.length;
    }

    next() {
        return this.books[this.index++];
    }
}

//Step 3 — Client Code

const library = new BookCollection();
library.addBook("JavaScript");
library.addBook("Desing pattern");
library.addBook("NodeJS");

const iterator = library.createIterator();

while (iterator.hasNext()) {
    console.log(iterator.next())
}

/*
When to Use Iterator Pattern

Use it when:

1️⃣ You need to traverse a collection
2️⃣ Hide internal structure
3️⃣ Provide multiple traversal strategies
*/