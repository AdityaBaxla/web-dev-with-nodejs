// Number
// let myNum: number = 25;
// myNum.toLowerCase(); // Wrong
// myNum.toString(); // Correct

// String
// let myName: string = "Abhishek";
// myName.toLocaleLowerCase(); // Correct

// Boolean
// let isAdmin: boolean = false;
// isAdmin = "Abhishek"; // Wrong;
// isAdmin = true;

// Types
// type User = {
//     id: number;
//     name: string;
//     email: string;
//     newUser: boolean;
// };

// function createNewUser(user: User) {}
// createNewUser("Abhishek"); // Wrong
// createNewUser({ name: "Akshay", email: "akshay@gmail.com", newUser: true }); // Wrong
// createNewUser({
//     id: 1,
//     name: "Akshay",
//     email: "akshay@gmail.com",
//     newUser: true,
// }); // Correct

// function getUser(id: number): User {} // Expect function to return something of type User

// const users: User[] = [];
// function getUser(id: number): User {
//     return users.find((user: User) => user.id === id);
// }

// getUser("Abhi"); // Wrong
// getUser(1); // Correct

// Union
// let myVar: string | number = 25;
// myVar = "Akshay"; // Correct
// myVar = 20; // Correct
// myVar = true; // Wrong

// let newArray1: string | number[] = [1, 2, 3, 4]; // Either a string or a number array
// let newArray2: string[] | number[] = ["Akshay", "Mahesh"]; // array of either all numbers or all strings
// let newArray3: (string | number)[] = ["Akshay", 25, "Mahesh", 28]; // array of numbers and strings

// // function to return a string in lowercase
// function getLowerCaseString(input: number | string): string {
//     if (typeof input === "string") return input.toLowerCase();
//     return input.toString().toLowerCase();
// }

// Tuples - Fix the size and order of elements in an array
// let myArray1: (string | number)[] = ["Abhi", 25]; // no fixed size
// let myArray2: [string, number, boolean] = ["Abhi", 25, true];
// myArray2 = ["Abhi", "Akshay", 25, 28, true]; // Wrong
// myArray2 = ["xyz", 34, false]; // Correct

// // Can still pass this validation using array methods
// myArray2.push(45, false);
// myArray2.push("ABC");

// Interfaces
interface User {
    id: number;
    name: string;
    email: string;
}

// const user1: User = {}; // Wrong
// const user2: User = { name: "Abhishek", email: "abhishek@gmail.com" }; // Still Wrong
// const user3: User = { id: 1, name: "Abhishek", email: "abhishek@gmail.com" }; // Correct

// function createNewUser(user: User) {}
// createNewUser("Abhishek"); // Wrong
// createNewUser({ name: "Akshay", email: "akshay@gmail.com", newUser: true }); // Wrong
// createNewUser({
//     id: 1,
//     name: "Akshay",
//     email: "akshay@gmail.com",
// }); // Correct

// function getUser(id: number): User {} // Expect function to return something of type User

// const users: User[] = [];
// function getUser(id: number): User | null {
//     const user = users.find((user: User) => user.id === id);
//     if (user) return user;
//     else return null;
// }

// getUser("Abhi"); // Wrong
// getUser(1); // Correct

// Interfaces Vs Types

// REOPEN
// interface User {
//     id: number;
//     name: string;
// }

// interface User {
//     email: string;
// }

// const user1: User = { id: 1, name: "XYZ" }; // Wrong
// const user2: User = { id: 1, name: "XYZ", email: "xyz@gmail.com" }; // Finally Correct

// type User = {
//     id: number;
//     name: string;
// };

// type User = {
//     email: string;
// }; // Wrong

// Extending an Interface or a Type

// interface Animal {
//     name: string;
// }

// interface Bear extends Animal {
//     canSwim: boolean;
// }

// const bear1: Bear = { name: "XYZ" }; // Missing property
// const bear2: Bear = { name: "XYZ", canSwim: true }; // All Good

// type Animal = {
//     name: string;
// };

// type Bear = Animal & {
//     canSwim: boolean;
// };

// const bear1: Bear = { name: "XYZ" }; // Missing property
// const bear2: Bear = { name: "XYZ", canSwim: true }; // All Good\

// Generics
// Useful when you want to lock the type of a variable
// function doSomething1(input: any): any {}
// function doSomething2<Type>(input: Type): Type {
//     return input;
// }

// interface User {
//     id: number;
//     name: string;
// }

// function doSomething3<User>(user: User): User {
//     return user;
// }

// Type Narrowing
function implementTypeNarrowing(input: string | string[]) {
    if (input) {
        if (typeof input === "object") {
            for (const value of input) {
                console.log(value);
            }
        } else if (typeof input === "string") {
            console.log(input);
        }
    }
}

// Note: The above implementation doesn't handle the empty string case, which should be handled in an ideal case
