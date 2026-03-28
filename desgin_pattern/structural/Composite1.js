// Implementing Composite Pattern in JavaScript

// We will build the File System example properly.


//Step 1 — Component (Common Interface)
//This is the base interface.
class FileSystemItem {
    show() {

    }
}

//Step 2 — Leaf (File)

class File extends FileSystemItem {
    constructor(name) {
        super();
        this.name = name;
    }
    show() {
        console.log("File: ", this.name)
    }
}

class Folder extends FileSystemItem {
    constructor(name) {
        super();
        this.name = name;
        this.children = [];
    }

    add(item) {
        this.children.push(item);
    }

    show() {
        console.log("Folder: ", this.name)
        this.children.forEach(child => child.show())
    }
}

//Step 4 — Client Code
const file1 = new File("resum.pdf");
const file2 = new File("photo.png");

const folder1 = new Folder("Document");
const folder2 = new Folder("Images");

folder1.add(file1);
folder2.add(file2);

const mainFolder = new Folder("Main");
mainFolder.add(folder1);
mainFolder.add(folder2);

mainFolder.show()


/*

Main Folder
   |
   |---- Documents
   |        |
   |      resume.pdf
   |
   |---- Images
            |
          photo.png



          When To Use Composite Pattern

Use it when:

1️⃣ You have tree structures
2️⃣ Need to treat single and group objects uniformly
3️⃣ Want recursive structures

Examples:

File systems
UI component trees
DOM structures
Menu systems
Organization hierarchies

*/