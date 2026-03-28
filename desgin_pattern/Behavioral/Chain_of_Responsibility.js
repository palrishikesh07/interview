/*
Imagine a leave approval system in a company.

Approval hierarchy:
Manager → Director → CEO


Rules:
Leave ≤ 3 days → Manager approves
Leave ≤ 7 days → Director approves
Leave > 7 days → CEO approves

*/



class LeaveApproval {

    approveLeave(days) {
        if (days <= 3) {
            console.log("Manager approved the leave")
        }
        else if (days <= 7) {
            console.log("Director approved the leave")
        }
        else {
            console.log("CEO approved the leave")
        }
    }
}

const leave = new LeaveApproval();
leave.approveLeave(6);


/*


Problem Here 🚨

Issues:
❌ Too many if-else conditions
❌ Hard to extend hierarchy
❌ Violates Open/Closed Principle
❌ Logic tightly coupled

If we add:

Team Lead
HR
VP

The class becomes messy.
*/