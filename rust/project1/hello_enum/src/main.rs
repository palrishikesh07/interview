
fn main(){
    // let user_input: Option<i32> = Some(10);
    // set_brightness(user_input);

    let coin: Crypto = Crypto::Btc(2);

    if let Crypto::Btc(amount) = coin{
        println!("You are rich mate! you have {amount} bitcoins.")
    }
    else {
        println!("Other Cypto")
    }

    // Other approach

    match coin {
        Crypto::Btc(amount) => println!("You are rich mate! {amount} bitcoins"),
        _=>println!("Other Crypto...")
    }
    
}

enum Crypto{
    Btc(i32),
    Eth(i32)
}


fn set_brightness(brightness:Option<i32>){
    match brightness {
        Some(values) => println!("The brighness was se to {values}%"),
        _=>()
    }
}