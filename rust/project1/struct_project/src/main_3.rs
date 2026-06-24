fn main() {
    // Without struct
    // let rect = (20,30);
    // With struct
    let rect = &Reactangle {
        width: 20,
        height: 30,
    };

    // println!("rect={:?}",rect);
    // println!(
    //     "The are of the rectangle is {} square pixels",
    //     get_area(rect)
    // );

    // For implemenation
    // dbg!(rect.get_area());
    rect.display();


    //
  
    rect.sample1(); // Equivalent to  (&rect).sample1()
    rect.sample2(); // Equivalent to  (&mut rect).sample2()
}
#[derive(Debug)] // With struct, to print the struct, we need to derive the Debug trait
struct Reactangle {
    width: u32,
    height: u32,
}

// Without struct
// fn get_area(dimensions:(u32,u32))->u32{
//     dimensions.0 * dimensions.1
// }

// With struct
// fn get_area(reactangle: &Reactangle) -> u32 {
//     reactangle.width * reactangle.height
// }



impl Reactangle {

    fn is_valid(&self)-> bool{
        self.width > 0 && self.height > 0
    }

    fn display(&self){
        if self.is_valid(){
            println!("The rectanle is:{}",self.get_area());
        }else {
            println!("The reactangle is invisible");
        }
    }

    fn get_area(&self)->u32{
        self.width *  self.height
    }
}

impl Reactangle {
    fn sample1(&self){}
    fn sample2(&mut self){}
}