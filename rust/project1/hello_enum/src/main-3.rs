fn main(){
    let kb = bytes(DataSize::KB);
    println!("Kb={:?}",kb);

    let two_gb = bytes(DataSize::GB(2));
    let twenty_five_gb = bytes(DataSize::GB(25));

    dbg!(two_gb);
    dbg!(twenty_five_gb);

}

enum DataSize{
    Byte,
    KB,
    MB,
    GB(u64),
}

fn bytes(size: DataSize)->u64{
    match size{
        DataSize::Byte => 1,
        DataSize::KB => {
            println!("1 KB to KB = 1000 bytes ");
            1000
        },
        DataSize::MB => 1000 * 1000,
        DataSize::GB(amount) => {
            let total = 1000 * 1000 * 1000 * amount;
            let billions= total / 1_000_000_000;
            println!("{amount} GB is {billions} billions bytes");
            total
        },
    }
}