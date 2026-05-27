interface A{
    age:string;
}

interface B{
    name:String;
}

interface  C extends A,B{
    name2:string;
}

type TA={
    age:string;
}

type TB={
    name:String;
}

type TC=TA & TB & {
    name2:string;
}


const c:C={
    age:'20',
    name:'Raj',
    name2:'Kumar'
}
