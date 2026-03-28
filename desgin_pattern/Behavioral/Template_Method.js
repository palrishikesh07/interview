/*
Imagine we are building a Beverage preparation system.

Steps to prepare any drink:
1 Boil water
2 Add ingredients
3 Pour into cup
4 Add toppings

Now we create two drinks:
Tea
Coffee
*/

class Tea {
    make() {
        console.log("Boil water");
        console.log("Add tea leaves");
        console.log("Pour into cup");
        console.log("Add sugar and milk");
    }
}


class Coffee {
    make() {
        console.log("Boil water");
        console.log("Add coffee beans");
        console.log("Pour into cup");
        console.log("Add sugar and milk");
    }
}

const tea = new Tea();
tea.make();

const coffee = new Coffee();
coffee.make();


/*
Problem Here 🚨

Issues:
❌ Duplicate steps
❌ Hard to maintain
❌ Logic repeated
❌ Violates DRY principle

Common steps:
Boil water
Pour cup
*/