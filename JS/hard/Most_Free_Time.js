

const allTimes = [
  "12:15PM-02:00PM",
  "09:00AM-10:00AM",
  "10:30AM-12:00PM"
];


function MostFreeTime(arr) {
    function toMinutes(t){
        let ampm = t.slice(-2);
        let [h,m] = t.slice(0,-2).split(":");
        console.log(h,m,ampm);
        
        if(ampm == "AM" && h == 12) h=0;
        if(ampm == "PM" && h != 12) h+=12;

        return h * 60 + m;

    }

    let allEvent = [];
    for(let i=0; i< arr.length; i++){
        let [start,end]=arr[i].split("-");
        allEvent.push([toMinutes(start),toMinutes(end)]);
    }
    // console.log(allEvent);
    
    allEvent.sort((a,b)=>a[0] - b[0]);
    console.log(allEvent);

    let max = 0;

    for(let i=1; i< allEvent.length; i++){
        max = Math.max(max, allEvent[i][0] - allEvent[i-1][1]);
    }

    // Convert minutes to HH:MM

    let hours =Math.floor(max/60);
    let mins = max%60;

    console.log(hours, mins);

    return String(hours).padStart(2,"0") + ":" + String(mins).padStart(2,"0");

}

console.log(MostFreeTime(allTimes));
