// User does not enter any thing for specifed time,than only call api,
//  other wise reset time


function debouncing(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args)
        }, delay);
    }
}


function search(query) {
    console.log(`Searching query ${query}`);
}


//// ES Function
// const debouncing = (fn, delay) => {
//     let timer;
//     return (...args) => {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             return fn(...args)
//         }, delay);
//     }
// }

// const search = (query) => {
//     console.log(`Searching query ${query}`);
// }

const searchWithDebouncing = debouncing(search, 1000);

searchWithDebouncing("H")
searchWithDebouncing("Hr")
searchWithDebouncing("Hri")
searchWithDebouncing("Hris")
searchWithDebouncing("Hrish")
searchWithDebouncing("Hrishi")
searchWithDebouncing("Hrishik")
searchWithDebouncing("Hrishike")
searchWithDebouncing("Hrishikes")
searchWithDebouncing("Hrishikesh")
searchWithDebouncing("Hrishikesh ")
searchWithDebouncing("Hrishikesh P")
searchWithDebouncing("Hrishikesh Pa")
searchWithDebouncing("Hrishikesh Pal")

// search("H")
// search("Hr")
// search("Hri")
// search("Hris")
// search("Hrish")
// search("Hrishi")
// search("Hrishik")
// search("Hrishike")
// search("Hrishikes")
// search("Hrishikesh")
// search("Hrishikesh ")
// search("Hrishikesh P")
// search("Hrishikesh Pa")
// search("Hrishikesh Pal")