fn main(){
    // let some_user = Some("Rishi");
    // let some_number = Some(44);

    // let user_selected: Option<&str> = None; // Some("Rishi");

    let a:u8 = 10;
    let b:Option<u8> = Some(20);

    //let sum = a+b;// We can directly used it

    let b_option = b.unwrap_or(0);
    let sum1 = a+b_option;
    println!("Sum is {}", sum1)

    let name:Option<&str> = Some("Raj");
    

}



// Custom Null
// enum Option<T>{
//     None,
//     Some(T)
// }


