fn main() {
    /*
    let result =dbg!(10+40);
    println!("{result}");

    let sum  = {
        let x=20;
        let y=90;
        x+y
    };
    dbg!(sum);
    */

    // This is single line comment

    /*
    This is multiline comments
    */

    // check_length("Rishi");
    // check_length("RishikeshPal1234");
    // if !is_length_ok("wer") {
    //     println!("Enter more character in password field");
    // }

    // dbg!(get_response("Hello Rishi"));
    // dbg!(get_response("How are you doing"));
    // dbg!(get_response("Bye!"));
    // let is_connected =false;
    // let result = if is_connected {"Connected"} else {"not connected"};// will throw error it should be sample type in this case "not connected" as string not -1
    
}


/*
fn check_length(password: &str) {
    let length = password.len();
    if length >= 10 {
        println!("'{password}' is long enough!")
    } else {
        println!("'{password}' is NOT long enough! Please add more characters.... ");
    }
}

fn is_length_ok(password: &str) -> bool {
    let length = password.len(); // This will count the bytes
    let correct_length = password.chars().count();
    println!("length = {length}");
    println!("correct_length={correct_length}");
    if length >= 10 { true } else { false }
}


fn get_response(input: &str) -> &str{
    let lowered: String = input.to_lowercase();

    if lowered.contains("hello"){
        "Hello there!"
    }
    else if lowered.contains("how are you") {
        "Good, and you?"
    }
    else if lowered.contains("good"){
        "Good to know that"
    }
    else {
        "I don't undestand."
    }
}
    */