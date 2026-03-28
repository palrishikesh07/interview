function useInbuiltPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("143");
            // reject("Some thing is not well bro..")
        }, 2000);
    })
}

useInbuiltPromise().then((data) => {
    console.log("Data is ", data);
}).catch((err) => {
    console.log("Error is ", err);
}).finally(() => {
    console.log("Done with function called");

})

// try {
//     const promiseData = await useInbuiltPromise();
//     console.log(promiseData);

// } catch (error) {
//     console.log(error);

// }
