// Interface for all handlers
interface PaymentHandler {
  setNext(handler: PaymentHandler): PaymentHandler;
  handlePayment(payment: Payment): Promise<boolean>;
}

// Payment data type
interface Payment {
  method: string;
  amount: number;
}

// Concrete handler: Credit Card
class CreditCardHandler implements PaymentHandler {
  private nextHandler: PaymentHandler | null = null;

  setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handlePayment(payment: Payment): Promise<boolean> {
    if (payment.method === "creditcard") {
      console.log("Processing Credit Card Payment...");
      return true; // Simulate successful processing
    } else if (this.nextHandler) {
      return this.nextHandler.handlePayment(payment);
    }
    return false; // No handler found
  }
}

// Concrete handler: PayPal
class PayPalHandler implements PaymentHandler {
  private nextHandler: PaymentHandler | null = null;

  setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handlePayment(payment: Payment): Promise<boolean> {
    if (payment.method === "paypal") {
      console.log("Processing PayPal Payment...");
      return true; // Simulate successful processing
    } else if (this.nextHandler) {
      return this.nextHandler.handlePayment(payment);
    }
    return false;
  }
}

// Concrete handler: Bank Transfer
class BankTransferHandler implements PaymentHandler {
  private nextHandler: PaymentHandler | null = null;

  setNext(handler: PaymentHandler): PaymentHandler {
    this.nextHandler = handler;
    return handler;
  }

  async handlePayment(payment: Payment): Promise<boolean> {
    if (payment.method === "banktransfer") {
      console.log("Processing Bank Transfer Payment...");
      return true; // Simulate successful processing
    } else if (this.nextHandler) {
      return this.nextHandler.handlePayment(payment);
    }
    return false;
  }
}

// --- Client Code: Build and use the chain ---
const creditCardHandler = new CreditCardHandler();
const payPalHandler = new PayPalHandler();
const bankTransferHandler = new BankTransferHandler();

// Chain setup: Credit Card → PayPal → Bank Transfer
creditCardHandler.setNext(payPalHandler).setNext(bankTransferHandler);

// Test the chain
async function processPayment(method: string, amount: number) {
  const payment: Payment = { method, amount };
  const result = await creditCardHandler.handlePayment(payment);
  console.log(`Payment ${result ? "successful" : "failed"} for ${method}`);
}

// Example usage
processPayment("creditcard", 100); // → Processes by CreditCardHandler
processPayment("paypal", 200); // → Processes by PayPalHandler
processPayment("banktransfer", 50); // → Processes by BankTransferHandler
processPayment("crypto", 300); // → Fails (no handler)
