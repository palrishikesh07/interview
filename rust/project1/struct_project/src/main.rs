
fn main(){

    let r1  = Reactangle{
        width:10,
        height:20,
    };

    let r2 = Reactangle{
        width:30,
        height:30,
    };

    dbg!(r1.get_area());
    dbg!(r2.get_area());

    dbg!(r1.fits_inside(&r2));
    r1.description();

    let rt1 = Reactangle::new_square(40);
    rt1.description();
    Reactangle::description(&rt1);

}

struct Reactangle{
    width:u32,
    height: u32,
}

impl Reactangle {
    fn get_area(&self) -> u32 {
    self.width * self.height
    }

    fn fits_inside(&self, other: &Reactangle) -> bool{
        self.width < other.width && self.height < other.height
    }

}

//We can have more than 1 implementation also
impl Reactangle {
    fn description(&self){
        println!("Reactanlge [width ={}, height={}]",self.width, self.height);
    }
}

// Asscoiate method

impl  Reactangle {
    fn new_square(size: u32)-> Self{
        Self { 
            width: size, 
            height: size 
        }
    }
}