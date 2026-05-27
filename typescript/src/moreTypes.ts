let response: any = "34";

let numericLength: number = (response as string).length; // force full type assertion

type Book = {
  name: string;
};

let bookString = '{"name":"Who moved my cheese"}';
let bookObject = JSON.parse(bookString) as Book; // forfull type assertion

console.log(bookObject.name);

const inputElement = document.getElementById("userName") as HTMLInputElement;

let value: any;
value = "chai";
value = [12, 3, 4];
value = 20.3;
value.toUpperCase();

let newValue: unknown;
newValue = "chai";
newValue = [12, 3, 4];
newValue = 20.3;
if (typeof newValue === "string") {
  newValue.toUpperCase();
}

// With try catch also

try {
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
  console.log("Error ", err);
}

const data: unknown = "chai aur code";

const strData: string = data as string;

// Never

type Role = "Admin" | "User" | "Guest";

function redirectBasedOnRole(role: Role): void {
  if (role === "Admin") {
    // return Redirect to admin page
    return;
  }
  if (role === "User") {
    // return Redirect to user page
    return;
  }
  role; // It will give us remaining roles available(in case if we have missed something)
}

function neverReturn(): never {
  while (true) { }
}


// Generic Types, Repository Pattern Example
interface BaseEntity {
  id: string;
}

class Repository<T extends BaseEntity> {
  private items: T[] = [];

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.find(item => item.id === id);
  }
}

// Usage
interface User extends BaseEntity {
  name: string;
}

const repo = new Repository<User>();

repo.create({
  id: "1",
  name: "Rishi"
});



// Event Type Definition
type UserCreatedEvent = {
  event: "USER_CREATED";
  payload: {
    userId: string;
    email: string;
  };
};

// producer

async function publishEvent(event: UserCreatedEvent) {
  await kafkaProducer.send({
    topic: "user-events",
    messages: [
      {
        value: JSON.stringify(event)
      }
    ]
  });
}



Step 1 — Metrics

Check:
CPU
Memory
DB connections
Event loop lag

Step 2 — Logs & Tracing
Use:
Datadog
Grafana
OpenTelemetry

Step 3 — Identify Bottleneck
Common causes:
N+1 queries
Sequential awaits
Missing indexes
External API latency

Step 4 — Optimization
Possible fixes:
Add Redis cache
DB indexing
Batch queries
Queue heavy jobs
Horizontal scaling