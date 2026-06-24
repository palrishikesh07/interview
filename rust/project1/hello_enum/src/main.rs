fn main() {
    // Example one

    let on = State::On;
    let off = State::Off;
    toggle(on);


    // Example two
    let home = IpAddress{
        kind:IP::V4,
        address: String::from("127.0.0.1"),
    };

    let message = Message::Create(String::from("Hello Rishi"));
    message.call();

}

enum State{
    On,
    Off,
}

fn toggle(current_state: State){}


enum IP {
    V4,
    V6,
}

struct IpAddress{
    kind:IP,
    address:String
}


enum Message{
    Quit,
    Move {x: i32, y:i32},
    Create(String),
    ChangeColor(i32,i32,i32),
}

// If we are creating Struct we have to create for each and every type with fixed its types

impl Message {
    fn call(&self){
        println!("Calling the method...");
    }
}
