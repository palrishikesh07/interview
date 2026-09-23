
/*
EXPENSE SPLITTING ALGORITHM - Interview Strategy

Step 1: Calculate Total Amount Paid per User
    - Sum up all values in each user's expense array
    - Determine how much each person paid out of pocket

Step 2: Determine the Fair Share per Person
    - If noOfPax is empty: Share = Total Paid / Total Users
    - If noOfPax is specified: Share = Total Paid / noOfPax.length
    - Only specified user IDs share the cost

Step 3: Compute Net Balances
    - For every user: Net Balance = Amount Paid - Fair Share
    - Positive balance (> 0): Creditor (is owed money)
    - Negative balance (< 0): Debtor (owes money)
    - Zero balance (= 0): Settled

Step 4: Settle Debts (Two-Pointer Greedy Matching)
    - Match the largest debtor with the largest creditor
    - Continue until all balances reach zero
    - Generate transactions to minimize number of payments
*/


const expenses = [{ id: 1, expense: [{ amount: 400, time: Date(), note: "groceries" }] },
{ id: 2, expense: [{ amount: 0, time: "", note: "" }] },
{ id: 3, expense: [{ amount: 100, time: "", note: "Travelling" }] },
{ id: 4, expense: [{ amount: 100, time: "", note: "" }] }
];

// console.log(expenses)

function getSplitValueSecond(expenses, participants = []) {

    // 1. Find total expense
    let totalExpense = 0;

    expenses.forEach(user => {
        user.expense.forEach(item => {
            totalExpense += item.amount || 0;
        });
    });

    // 2. If no participants are provided,
    //    everyone participates
    if (participants.length === 0) {
        participants = expenses.map(user => user.id);
    }
    

    // 3. Calculate each person's share
    const share = totalExpense / participants.length;

    


    console.log("Total:", totalExpense);
    console.log("Participants:", participants);
    console.log("Each person:", share);


    // 4. Find how much each user paid
    const paid = {};

    expenses.forEach(user => {

        paid[user.id] = user.expense.reduce(
            (sum, item) => sum + (item.amount || 0),
            0
        );

    });


    // 5. Calculate balance
    // positive = should receive
    // negative = should pay

    const balance = {};

    expenses.forEach(user => {
        const userShare = participants.includes(user.id) ? share: 0;
        balance[user.id] = paid[user.id] - userShare;

    });


    // 6. Separate people who receive and pay

    const receive = [];
    const pay = [];

    Object.entries(balance).forEach(([id, amount]) => {

        if (amount > 0) {
            receive.push({
                id: Number(id),
                amount
            });
        }

        if (amount < 0) {
            pay.push({
                id: Number(id),
                amount: -amount
            });
        }

    });


    // 7. Match payer with receiver

    const dues = {};

    let receiverIndex = 0;
    let payerIndex = 0;

    while (
        receiverIndex < receive.length &&
        payerIndex < pay.length
    ) {

        const receiver = receive[receiverIndex];
        const payer = pay[payerIndex];

        const amount = Math.min(
            receiver.amount,
            payer.amount
        );


        // Create record for payer
        if (!dues[payer.id]) {
            dues[payer.id] = {
                amount_due: [],
                due_user_id: []
            };
        }


        dues[payer.id].amount_due.push(amount);
        dues[payer.id].due_user_id.push(receiver.id);


        // Reduce remaining amounts

        receiver.amount -= amount;
        payer.amount -= amount;


        if (receiver.amount === 0) {
            receiverIndex++;
        }

        if (payer.amount === 0) {
            payerIndex++;
        }
    }


    // 8. Add dues to users

    const allSettlement =  expenses.map(user => ({

        ...user,

        amount_due: dues[user.id]?.amount_due || [],

        due_user_id: dues[user.id]?.due_user_id || []

    }));

    return JSON.stringify(allSettlement,null,2);
}


console.log(getSplitValueSecond(expenses, [1, 3]));