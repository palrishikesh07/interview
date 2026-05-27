
fn say_hello(){
    println!("Hello, Raj!");
}

fn hello_by_name(name:&str){
    println!("Hello, {name}!");
}

fn repeat_value(text:&str, times:usize){
    println!(" {} ",text.repeat(times));
}

fn celsius_to_fahrenheit(celsius:f64) -> f64{
    // celsius * 9.0/5.0 + 32.0 // without return also work, just not to put semicolom ; at the end
    return celsius * 9.0/5.0 + 32.0;
}

fn add(a:i32,b:i32) -> isize{
    println!("Adding {a} + {b}");
    (a+b) as isize
}

fn main() {
    say_hello();
    hello_by_name("Rishi");
    repeat_value("Money",4);
    let converted_fahrenheit = celsius_to_fahrenheit(40.0);
    println!("Fahrenheit value {}",converted_fahrenheit);
    let result = add(10, 30);
    dbg!(result);
    good_bye();
}

fn good_bye(){
    println!("End of function!");
    println!("Good bye");
    
}