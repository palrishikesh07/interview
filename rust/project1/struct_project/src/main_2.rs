fn main(){
    let blue = Color(0,0,255);
    let date = Date(24,06,2026);
    display_date(&date);

    // Destructing with stuct name
    let Date(day,month,year) = date;
    dbg!(day,month,year);
}

struct Color(u16,u16,u16);
struct Date(u16,u16,u16);

fn display_date(date: &Date){
    println!("The date is {}/{}/{}", date.0,date.1, date.2);
}
