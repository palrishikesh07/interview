use rand::RngExt;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number: u32 = rand::rng().random_range(1..=100);
    // println!("The secret number is: {}", secret_number);
    let mut attempt: u32 = 0;
    loop {
        println!("Input your guess....");
        let mut guess: String = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = guess.trim().parse().expect("Please type a valid number!");
        println!("You guessed: {}", guess);
        attempt = attempt + 1;
        // Compare
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("....Too Small!!...."),
            Ordering::Greater => println!("....Too Big!!...."),
            Ordering::Equal => {
                println!("You guessed correctly!");
                break;
            }
        }
    }
    println!("You have guess with {} attempt", attempt);
}
