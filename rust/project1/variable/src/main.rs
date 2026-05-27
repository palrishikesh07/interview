fn main() {
    // let mut number = 20; // Immutable by default used mut to make it mutable
    // let first_name = "Rishi"; // Snake casing variable naming
    // const ONE_MINUTE: i32 = 60; // Const can not be caculate at run time,there must be made in-place
    // const ONE_HOUR: i32 = ONE_MINUTE * 60;
    // const PI: f64 =3.1415; // Const can be used as global variable outside of main() also.

    // println!("Number is {}", number);
    // number += 1;
    // println!("Number : {number}");

    // println!("My name is {first_name}");

    // println!("One minutes is: {ONE_MINUTE}s");
    // println!("One Hour is: {ONE_HOUR}s");

    // Shadowing variable

    // let n = 5;
    // {
    //     let n = 10;
    //     println!("Inner n is  {n}")
    // }
    // println!("Outer n : {n}")

    // let spaces = "      ";      // String type
    // let spaces = spaces.len();  // Int type, so we can't use mut here, need to re-assign with new type of variable
    // println!("Spaces: {spaces}");

    //Data types

    let user_input = "100";
    println!("User value {}", user_input);

    let converted: u32 = user_input.parse().expect("Could not parse....");
    println!("Convered value {}", converted);

    //Adding value
    // println!("User value {}",user_input+50); // Error
    println!("Convered value {}", converted + 50); // 150

    // Scalar
    // let number: i8=10;
    // let pi: f32 = 3.1415;
    // let turned_on:bool = false;
    // let dollar:char = '$';

    // // Compound
    // let coordinates: (f32, f32)= (1.5,2.5);
    // let people:[&str,3]=["Rishi","Raj","Rohan"];

    // // Interger
    // // let n1: i8 = -100; // -128 to 127;
    // // // let n2: u8 = 200;//    0 to 255; (totol 256 )
    // // let deault n = 1000; // i32 bit, -2,14,74,83,648 to 2,14,74,83,647
    // // let deault n: u32 = 1000; // u32 bit,  4,29,49,67,295

    // let mut x: u8 = 255; // Its maximum size
    // // x += 10;
    // println!("x: {}", x); // Normal run will throw error, while on relase "cargo run --release" it will over write after 255 ie. 9

    // // Trillion
    // let trillion: i64 = 1000000000000;
    // let formated: i64 = 1_000_000_000_000;
    // println!("Trillion: {}",trillion);
    // println!("Formated: {}", formated);


    // // Float
    // let pi:f32 = 3.1415927_213243432432;
    // let decimal: f64 = 2.712359373937220234234234234234234;

    // println!("pi={}",pi); // Exrra part will be truncate
    // println!("pi={}",decimal);

    // let a:f64 = 0.1;
    // let b:f64 = 0.2;
    // let sum:f64 = a+b;
    // println!("sum = {}",sum);
    // println!("{}",sum == 0.3); // false

    // let connected_to_internet:bool = false;
    // let has_cat:bool = true;

    // println!("connected_to_internet={}",connected_to_internet);
    // println!("has_cat={}",has_cat);

    // let money:i32 = 5_000;
    // println!("money {}", money);
    // if money > 0{
    //     println!("You are not broke!");
    // }

    // let letter:char ='a';
    // let alpha:char = '@';
    // let hashtag:char= '#';

//     //Tuples
//     // let data = (10,3.5,true);
//     let data:(u8,f32, bool) = (10,3.5,true);
//     // println!("data={:?}",data)
//     // Destructing
//     let (n,d,b) = data;
//     println!("{n}, {d}, {b}");
//     // Or
//     let first = data.0;
//     let second = data.1;
//     let third = data.2;

//     println!("First = {}",first);
//     println!("second = {}",second);
//     println!("third = {}",third);

//     // Coordinates Example
//     let coordinates: (f32, f32) = (2.5,1.5);
//     println!("The treasures is located here: {:?}",coordinates);

    // let empty:()=();

}

