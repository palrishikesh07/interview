fn main() {
    // let mut apple = Fruit{
    //     name: String::from("Apple"),
    //     // colour:String::from("Red"),
    //     grams:100,
    //     price:5.5
    // };

    // let name = apple.name;
    // let grams = apple.grams;

    // println!("{name} weight {grams}");
    // println!("Old weight {:?}",apple.grams);
    // apple.grams = 250;
    // println!("New weight {:?}",apple.grams);

    let orange = create_fruit("Orange", 220);
    println!(
        "{} g of {} cost : ${:.2}",
        orange.grams, orange.name, orange.price
    );
}

struct Fruit {
    name: String,
    // colour: String,
    grams: i32,
    price: f32,
}

fn create_fruit(name: &str, grams: i32) -> Fruit {
    Fruit {
        name: String::from(name),
        grams: grams,
        price: (0.02 * grams as f32),
    }
}

// Or Shorthand

fn create_fruit_short(name: String, grams: i32) -> Fruit {
    Fruit {
        name,
        grams,
        price: (0.02 * grams as f32),
    }
}
