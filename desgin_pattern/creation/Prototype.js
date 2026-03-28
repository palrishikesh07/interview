/*
One-line Interview Definition

Prototype Pattern creates new objects by copying (cloning) an existing object.

This is useful when object creation is expensive or complex.

*/

//Every time we create a user, we build the full object again.

class User {
    constructor(name, role, permission) {
        this.name = name;
        this.role = role;
        this.permission = permission;
    }
}

const admin1 = new User("Alice", "Admin", ["read", "write", "delete"]);
const admin2 = new User("Admin2", "Admin", ["read", "write"]);

console.log(admin1)
console.log(admin2)

/*

Problems ❌

1️⃣ Repeated object creation
2️⃣ Expensive if object is complex
3️⃣ Duplicate data logic

Imagine a system with:

1000 admins
1000 editors
1000 viewers

You repeat the same structure again and again.

*/