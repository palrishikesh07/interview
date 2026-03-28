// Composite Pattern is a Structural Design Pattern used when we want to treat individual objects and groups of objects in the same way.

class File {
    constructor(name) {
        this.name = name;
    }

    show() {
        console.log("File: " + this.name);
    }
}

class Folder {
    constructor(name) {
        this.name = name;
        this.files = [];
    }

    add(file) {
        this.files.push(file)
    }

    show() {
        console.log("Folder: ", this.name);

        this.files.forEach(file => {
            if (file instanceof File) {
                file.show();
            }
            else if (file instanceof Folder) {
                file.show();
            }
        })
    }

}

// Client Code

const file1 = new File("resume.pdf");
const file2 = new File("cover_letter.doc");
const folder1 = new Folder("Documents");
folder1.add(file1);
folder1.add(file2);

folder1.show();


/*
❌ Client must treat files and folders differently
❌ Many type checks (instanceof)
❌ Hard to extend system

Example:

File
Folder
ZipFolder
CloudFolder




Composite Pattern allows you to compose objects into tree structures and treat individual objects and groups uniformly.

Meaning:
Single object
and
Group of objects

→ handled the same way
*/