//❌ Bad Example

class UserServiceExample{
    createUser(){
        console.log("User created");
    }

    sendEmail(){
        console.log("Email sent");
    }

    generateReport(){
        console.log("Report generated");
    }
}

// Problem
// This class handles: User logic ,Email logic & Reporting logic
// Too many responsibilities.


// ✅ Good Example

class UserService{
    createUser(){
        console.log("User created");
    }
}

class EmailService{
    sendEmail(){
        console.log("Email sent");
    }
}

class ReportService{
    generateReport(){
        console.log("Report generated");
    }
}

// Each class has a single responsibility, making the code more maintainable and easier to understand.

// Real Backend Use Case
// Separate:
// AuthService
// EmailService
// PaymentService
// NotificationService