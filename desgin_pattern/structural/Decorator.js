//Interviewers like it because it shows how to add new behavior to objects dynamically without modifying existing code.


/*
Imagine we are building a Coffee ordering system.

Coffee types:
Basic Coffee

Extras:
Milk
Sugar
Whipped Cream


*/

//We create multiple classes for combinations.

class Coffee {
    cost() {
        return 50;
    }
}

class CoffeeWithMilk {
    cost() {
        return 50 + 10;
    }
}

class CoffeeWithSugar {
    cost() {
        return 50 + 5;
    }
}

class CoffeeWithMilkAndSugar {
    cost() {
        return 50 + 10 + 5;
    }
}

const myCoffee = new CoffeeWithMilkAndSugar();
console.log(myCoffee.cost());




/*
Problem Here 🚨

If we add:

Caramel
Chocolate
WhippedCream
Honey


Classes explode:
CoffeeWithMilk
CoffeeWithSugar
CoffeeWithMilkAndSugar
CoffeeWithMilkAndChocolate
CoffeeWithSugarAndHoney
...

This is called:
👉 Class Explosion Problem


Decorator Pattern Idea

Instead of creating many classes, we wrap objects with additional functionality.

Structure:

Object → Decorator → Decorator → Decorator

Example:

Coffee
   |
MilkDecorator
   |
SugarDecorator
*/