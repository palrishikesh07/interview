fn main() {
    // Fixed size with same type store in stack
    /*

    let _numbers = [1,2,3,4,5]; // To ignore variable, _ put to avoid comiper error of unsued variable
    let _days =["Mon","Tue","Weds","Thurs","Fri","Sat","Sun"];
    let number_3_digit:[u8;3]=[1,2,3];

    println!("Number3Disit={:?}",number_3_digit);
    println!("Number3Disit={:?}",_days);

    let first = _days[0];
    println!("first: {}",first);


    let invalid_selection  = _days[9];
    println!("Invalid selection={:?}",invalid_selection)

     */

    // Repeat
    // let repreat_array =["Money";10];
    // println!("repeat={:?} ",repreat_array)

    // Loop

    /*
       let mut n =0;
       // Indifinet loop
       loop {
           n+=1;
           println!("n={:?}",n);
           if(n == 1000000) {
               break;
           }
       }
       // Return value from loop
        let mut counter = 0;
       let result  = loop {
           counter +=1;
           if counter == 1000000 {
               break counter;
           }

       };

       println!("Final Counter value ={}",result);
    */

    /*
    // While loop
    let mut number = 5;
    while number > 0 {
        if number == 3{
            println!("Skipping {}", number);
             number -=1;
            continue;
        }
        println!("number={:?}",number);
        number -=1;
    }
     */

    // For loop
    // let numbers:[i32;5]=[1,2,3,4,5];
    // let mut power_total = 0;
    // for number in numbers{
    //     let squared = number.pow(2);
    //     println!("{number}:{:?}",squared);
    //     power_total +=squared
    // }

    // dbg!(power_total);

    // Inner loop logic
    let mut main_counter = 0;
    'main: loop{
        println!("Outer :{main_counter}");
        let mut inner_counter = 0;
        
        loop {
            println!("Inner: {inner_counter}");
            inner_counter +=1;

            if inner_counter == 3 {
                println!("---------------");
                break;
            }

            if main_counter == 3{
                println!("Exitinng out of all loops");
                break 'main;
            }
        }
        main_counter +=1;
    }

}
