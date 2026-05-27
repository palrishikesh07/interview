// 1. How do you format a date as YYYY-MM-DD without using an external library?

function formatYYYYMMDD(date){
    
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,0); // Month Start with 0
    const day = date.getDay(); // WeekDay
    const dayDate = String(date.getDate()).padStart(2,0); // Add 0 if data is in single digit
    return `${year}-${month}-${dayDate}`
}

console.log(formatYYYYMMDD(new Date())); // Output: "2024-06-01"

// Add days to date

const sampleDate = new Date("2024-06-01")
console.log(sampleDate)
sampleDate.setDate(5);
console.log(sampleDate)
sampleDate.setDate(39);
console.log(sampleDate)


//How do you find the number of days between two specific dates?

const startDate = new Date("2026-05-01");
const endDate = new Date("2026-05-21");

// Difference in milliseconds
const differencesMs = endDate - startDate;

console.log(differencesMs);

// Difference in milliseconds

const days = differencesMs / ( 24 * 60 * 60 * 1000); // Convert milliseconds to days, Hours * Mins * Secs * MS
console.log(days);


function  getLastDayOfMonth(year, month){
    return new Date(year, month + 1, 0).getDate(); // Month Start with 0
}

console.log(getLastDayOfMonth(2024, 1)); // Output: 29 (February in a leap year)
console.log(getLastDayOfMonth(2024, 0));
console.log(getLastDayOfMonth(2026, 1));



// The Bug
const originalDate = new Date('2026-05-20');
const deliveryDate = originalDate; 
deliveryDate.setDate(originalDate.getDate() + 5);

console.log(originalDate.getDate()); // 25 -> Oops, original date was mutated!

// The Fix: Clone the date
const sourceDate = new Date('2026-05-20');
const realDeliveryDate = new Date(sourceDate.getTime()); // Cloned safely
realDeliveryDate.setDate(sourceDate.getDate() + 5);

console.log(sourceDate.getDate());         // 20 (Safe)
console.log(realDeliveryDate.getDate());     // 25


//How do you format a date using the user's localized settings without external tools?

const eventDate = new Date('2026-05-20');
const localizedDate = eventDate.toLocaleDateString(); // Uses user's locale settings    
console.log(localizedDate); // Output will vary based on user's locale (e.g., "5/20/2026" in the US, "20/5/2026" in many European countries)

const UKformated = new Intl.DateTimeFormat('en-GB').format(eventDate);
console.log(UKformated); // Output: "20/05/2026" (UK format)

const USformated = new Intl.DateTimeFormat('en-US').format(eventDate);
console.log(USformated); // Output: "5/20/2026" (US format)




///The Concept: Date.now() gets the timestamp of the exact current instant. Date.parse() attempts to convert an environment string into a timestamp.//

// Returns current UNIX timestamp directly (No object instantiation overhead)
const currentTimestamp = Date.now(); 
console.log(currentTimestamp); // e.g., 1779266634000

// Parses a string and returns its matching UNIX timestamp
const parsedTimestamp = Date.parse('2026-05-20T12:00:00Z');
console.log(parsedTimestamp); // 1779278400000


// How do you safely check if a value is a valid Date object?
// The Practicality: Form validation handling input strings or values that might evaluate to Invalid Date.

// The Concept: An invalid date is still an instance of Date, but its numeric time value is NaN.

function isValidDate(value) {
  // Check if it's a Date instance, then check that its value isn't NaN
  return value instanceof Date && !isNaN(value.getTime());
}

console.log(isValidDate(new Date('2026-05-20'))); // true
console.log(isValidDate(new Date('not-a-date')));  // false
console.log(isValidDate('2026-05-20'));            // false (string, not Date instance)


// How do you convert a local browser time directly into UTC?
// The Practicality: Standardizing user timestamps before transmitting them to a centralized backend API database.

// The Concept: .toISOString() shifts the date representation directly into UTC timezone format (signaled by the trailing Z).

// Browser is in a local timezone (e.g., IST / GMT+5:30)
const localDate = new Date('2026-05-20T14:30:00'); 

// Converts the representation to standardized Zulu (UTC) time string
console.log(localDate.toISOString()); 
// "2026-05-20T09:00:00.000Z" (Shifted back 5.5 hours to represent UTC)


//  How do you add or subtract specific hours from a JavaScript Date?
// The Practicality: Creating countdown systems, session timeouts, or managing expiring web tokens.

// The Concept: Extract the time values using .getTime() (milliseconds) or use .setHours() combined with .getHours().


const sessionStart = new Date('2026-05-20T10:00:00');

// Add 2 hours
sessionStart.setHours(sessionStart.getHours() + 2);
console.log(sessionStart.toISOString()); // Hours component updated to 12:00:00



//How do you determine if a given year is a Leap Year?
function isLeapYear(year) {
  // Check if February 29th stays in February (index 1)
  return new Date(year, 1, 29).getMonth() === 1;
}

console.log(isLeapYear(2026)); // false
console.log(isLeapYear(2028)); // true