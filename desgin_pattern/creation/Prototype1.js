//Instead of creating objects again, we clone an existing object.

//Prototype Class
class User {
    constructor(name, role, permission) {
        this.name = name;
        this.role = role;
        this.permission = permission;
    }

    clone() {
        return new User(this.name, this.role, this.permission);
    }
}


//Prototype Class
const adminProtoype = new User("Default Admin", "admin", ["read", "write", "delete"]);

//Clone Objects
const admin1 = adminProtoype.clone();
admin1.name = "Admin1";

const admin2 = adminProtoype.clone();
admin2.name = "Admin2";

console.log(admin1)
console.log(admin2)


/*

        Prototype
           |
        clone()
           |
      Concrete Prototype
           |
         Object



         JavaScript already uses prototype internally.

Example:

const person = {
  greet() {
    console.log("Hello");
  }
};

const user = Object.create(person);

user.greet();

Here:

user → inherits from → person


*/



class Character {
    constructor(type, health, attack) {
        this.type = type;
        this.health = health;
        this.attack = attack;
    }

    clone() {
        return new Character(this.type, this.health, this.attack);
    }
}

const warriorPrototype = new Character("Warrior", 100, 20);

const warrior1 = warriorPrototype.clone();
const warrior2 = warriorPrototype.clone();

console.log(warrior1);
console.log(warrior2);

