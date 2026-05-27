import { Namespace } from "socket.io";

interface UserRepository {
  findById(id: string): void;
}

class MySQLUserRepository implements UserRepository {
  findById(id: string): void {
    console.log(`Finding user with id ${id} in MySQL database`);
  }
}

class MongoDBUserRepository implements UserRepository {
  findById(id: string): void {
    console.log(`Finding user with id ${id} in MongoDB database`);
  }
}

class UserRepositoryFactory {
  static create(type: string): UserRepository {
    if (type === "mysql") {
      return new MySQLUserRepository();
    } else if (type === "mongodb") {
      return new MongoDBUserRepository();
    } else {
      throw new Error("Invalid repository type");
    }
  }
}

// Client Code
const userRepository = UserRepositoryFactory.create("mysql");
userRepository.findById("123");





