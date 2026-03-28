/*
Template Method Idea

Instead of repeating the whole algorithm:
We create a template (skeleton) of the process.
Child classes only implement specific steps.

Structure:
Template
   |
Concrete Class


Definition:
Template Method defines the skeleton of an algorithm in a base class while allowing subclasses to override specific steps.


Very common interview examples:
Cooking Recipe

    Recipe
      |
    Boil
    Cook
    Serve

Each dish customizes ingredients.
*/

//Step 1 — Base Template Class

class Beverage {
    make() {
        this.boilWater();
        this.addIngredients();
        this.pourInCup();
        this.addTroppings();
    }

    boilWater() {
        console.log("Boiling water...");
    }

    pourInCup() {
        console.log("Pouring into cup")
    }
}

//make() = Template Method
//Algorithm structure is fixed.

//Step 2 — Tea Class

class Tea extends Beverage {
    addIngredients() {
        console.log("Adding tea leaves");
    }

    addTroppings() {
        console.log("Adding sugar and milk");
    }
}

//Step 3 — Coffee Class

class Coffee extends Beverage {
    addIngredients() {
        console.log("Adding coffee beans");
    }

    addTroppings() {
        console.log("Adding cream/milk and sugar");
    }
}

// Step 4 — Client Code

const tea = new Tea();
tea.make();

const coffee = new Coffee();
coffee.make();


/*
Client
   |
Template Method
   |
Step1
Step2 (custom)
Step3
Step4 (custom)



When to Use Template Method

Use when:
1️⃣ Algorithm structure is fixed
2️⃣ Some steps vary
3️⃣ Want code reuse

*/