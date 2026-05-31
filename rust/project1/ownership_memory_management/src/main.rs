
fn main() {
    // By Default it used &str
    // let mut user_name1 = "Rishi";
    // user_name1 +"Pal"; // Throw error
    // dbg!(user_name1);

    // // String
    // let mut name = String::from("Rishi");
    // name += " Pal";
    // dbg!(name); // name = "Rishi Pal"

    // let original_text = String::from("Rishi");
    // let text_copy = original_text; // It will not copy actual data, string data(ptr, len, capacity)
    // // original_text is no longer valid as it transfer/move to other variable and its shallow copy
    // dbg!(text_copy);

    // If you want to access 1 owner also
    // let name = String::from("Rishi");
    // let name_copy = name.clone(); // It can be expensive
    // dbg!(name);
    // dbg!(name_copy);

    // let text = String::from("Rishi");
    // greet(text); // Ownership transfer to greet method
    // println!("text={text}"); // it can not used

    //    let n=200;
    //    display_number(n);
    //    println!("Second attempt is {n}");

    // let s1 = create_string();
    // let s2=create_string();
    // println!("{s1} {s2}") // this will work

    // To Get the ownership back
    // let text = String::from("Rishikesh");
    // let (text,length) = total_charactes(text);
    // println!("{text} has a total length {length}")

    // References
    // let name = String::from("Rishikesh");
    // let len = get_length(&name);
    // println!("The length of {name} is {len}");

    // dbg!(name,len); // It will work, as it doest not pass ownernship

    // let mut text = String::from("Rishieksh");
    // modify(&mut text);
    // println!("Text is {text}");

    // let mut text = String::from("Rishi");
    // let r1 = &mut text;
    // let r2 = &mut text;
    // dbg!(r1,r3); // Throw  error for mutable

    // let  text = String::from("Rishi");
    // let r1 = &text; // Only reading is allowed
    // let r2 = &text; // Only reading is allowed
    // // let r3 = &mut text; // Can not brrow as it borrow immutaable
    // dbg!(r1,r2);

    // let mut x=10;
    // let y = &mut x;
    // x +=3; // Not allowed once it has pass ownership to other variable

    // let elements = ['a','b','c'];
    // for(i,&element) in elements.iter().enumerate(){
    //     println!("{i}: {element}")
    // }

    // let mut sentence = String::from("BOB the builder");
    // let first_word  = get_first_word(&sentence);
    // println!("First word={:?}",first_word);
    // sentence.clear();


    //
    // let sentence = String::from("Bob loves chines food.");

    // let s1 = &sentence[..3]; // 0 to 3
    // let name = &sentence[0..3];
    // let food = &sentence[10..17]; // Or [10..=16];
    // let all_remaining_sentece = &sentence[10..];
    // let all_sentece = &sentence[..];

    // dbg!(s1,name,food,all_remaining_sentece,all_sentece);
    

//    let  sentence = String::from("Holy bananas!");
//    let sentences2 = "Bob say hi!";
//    let word = get_first_word_proper(sentences2);
//     dbg!(word);

let arr = [1,2,3,4,5];
let slice = &arr[2..];
println!("slice={:?} ",slice);


}

// fn greet(name:String){
//     println!("Hello, {name}");
// }

// fn display_number(n:i32){
//     println!("The number is: {n}");
// }

// fn create_string() -> String{
//     String::from("Raj")
// }

// fn total_charactes(text:String) -> (String, usize){
//     let length  =text.chars().count();
//     (text,length)
// }

// References

// fn get_length(text: &String) -> usize{
//     text.chars().count()
// }

// fn modify(text: &mut String){
//     text.push_str(" Pal");
// }

// // Not allowed as it will create dangling references in main function
// fn funct() -> &String{
//     let text = String::from("Rishi");
//     &text
// }

// Not used rerfences in wrong place inside function
// fn funct() -> String {
//     let text = String::from("Rishi");
//     text
// }



// // String slices

// fn get_first_word(sentence: &String) -> usize{
//     let bytes = sentence.as_bytes();

//     for(i,&item) in bytes.iter().enumerate(){
//         if item == b' '{
//             return i
//         }
//     }

//     sentence.len()
// }


// fn get_first_word_proper(sentence:&str)->&str{
//     let bytes = sentence.as_bytes();

//     for(i,&item) in bytes.iter().enumerate(){
//         if item == b' '{
//             return &sentence[..i];
//         }
//     }
//     &sentence[..]
// }