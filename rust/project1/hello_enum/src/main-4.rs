use rand::Rng;
fn main(){
    // let user = Some("Rishi");
    // let result = user_exists(user);
    // println!("result = {:?}",result)

    let roll  =roll_dice();
    board_event(roll);


 

}

   fn roll_dice() -> u8{
        let mut rng = rand::rng();

        let roll = rng.gen_range(1..=6);
        println!("Bob rolled a :{roll}");
        roll
    }

fn user_exists(user:Option<&str>) -> bool{
    match user{
        None => {
            println!("Please insert a user name to search..");
            false
        }
        Some(user)=>{
            println!("Looking for user...");
            println!("'{user}' found");
            true
        }
    }
}



enum Grade{
    A,
    B,
    C
}
// Each and every enum should be covered otherwise rust will throw error
fn grade_to_score(grade:Grade) -> u8{
    match grade{
        Grade::A => 100,
        Grade::B => 90,
        Grade::C => 80
    }
}


fn board_event(roll:u8){
    match roll{
        1 => println!("Bob goes down 2 pointer"),
        2 => println!("Bob win the lottery"),
        other => println!("Bob moves forward {other} spaces"),
    }
}