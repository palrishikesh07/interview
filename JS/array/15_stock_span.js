//online-stock-span

const arr = [100, 80, 60, 120];

//Naive Approach

function calculateSpanNaive(arr) {
    let n = arr.length;
    let span = new Array(n).fill(1);

    for (let i = 1; i < arr.length; i++) {
        let j = i - 1;
        console.log(j)
        while (j >= 0 && arr[i] >= arr[j]) {
            span[i]++;
            j--;
        }
    }
    return span;
}

console.log(calculateSpanNaive(arr));


//Expected Approach

function calculateSpanApproch(arr) {
    let n = arr.length;
    let span = new Array(n);
    let st = [];

    for (let i = 0; i < n; i++) {
        while (st.length > 0 && arr[st[st.length - 1]] < arr[i]) {
            st.pop();
        }
        span[i] = st.length === 0 ? i + 1 : i - st[st.length - 1];
        st.push(i);
    }
    return span;
}

console.log(calculateSpanApproch(arr));