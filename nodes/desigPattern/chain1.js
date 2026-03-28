// Abstract base handler class
class Handler {
    constructor() {
        this.nextHandler = null;
    }

    // Set the next handler in the chain
    setNext(handler) {
        this.nextHandler = handler;
        return handler; // Enables method chaining
    }

    // Handle the request
    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null; // No handler processed the request
    }
}

// Concrete handler: Email Validator
class EmailValidator extends Handler {
    handle(request) {
        if (!request.email || !request.email.includes('@')) {
            return { valid: false, error: 'Invalid email format' };
        }
        return super.handle(request);
    }
}

// Concrete handler: Password Validator
class PasswordValidator extends Handler {
    handle(request) {
        if (!request.password || request.password.length < 8) {
            return { valid: false, error: 'Password must be at least 8 characters' };
        }
        return super.handle(request);
    }
}

// Concrete handler: Username Validator
class UsernameValidator extends Handler {
    handle(request) {
        if (!request.username || request.username.length < 3) {
            return { valid: false, error: 'Username must be at least 3 characters' };
        }
        return { valid: true }; // All validations passed
    }
}

// Usage example
const emailValidator = new EmailValidator();
const passwordValidator = new PasswordValidator();
const usernameValidator = new UsernameValidator();

// Set up the chain
emailValidator.setNext(passwordValidator).setNext(usernameValidator);

// Test with valid data
const validForm = {
    email: 'user@example.com',
    password: 'securepass123',
    username: 'johndoe'
};

console.log(emailValidator.handle(validForm)); // { valid: true }

// Test with invalid password
const shortPassword = {
    email: 'user@example.com',
    password: 'short',
    username: 'johndoe'
};

console.log(emailValidator.handle(shortPassword)); // { valid: false, error: 'Password must be at least 8 characters' }   