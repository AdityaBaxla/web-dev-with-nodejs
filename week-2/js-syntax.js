//scope
if (true) {
  let x = 10;
  var y = 20;
}
console.log(x); // ❌ ReferenceError
console.log(y); // ✅ 20

{
  let x = "tommy";
  x = 10; // ✅ this is fine
  const y = "charlie";
  y = "learning javascript"; // ❌ gives an error
}

let x = 10;
x = 15; // ✅ this is fine
let x = 20; // ❌ gives an error

var z = true;
var z = 30; // ✅ this is fine

function container() {
  var artist = "Taylor";
}
container();
console.log(artist); // ❌ gives an error

// Primitives
let name = "Aditya";
let count = 10;
let isActive = true;
let notDefined;

console.log(typeof name); // string
console.log(typeof age); // number

// Objects
let nums = [1, 2, 3];
let greet = function () {
  console.log("Hello!");
};

console.log(typeof nums); // object
console.log(typeof greet); // function

greet.language = "English";
console.log(greet.language); // English

function greet(name) {
  return `Hello, ${name}!`;
}

const greet = (name) => `Hello, ${name}!`;

//callback

const fs = require("fs");

console.log("Start reading file...");

fs.readFile("example.txt", "utf8", function (err, data) {
  console.log("File read complete");
});

console.log("Other code running...");

fetch("/data.json")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

async function loadData() {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

("use strict");
x = 10; // ❌ ReferenceError

try {
  // risky code
} catch (error) {
  console.error("Something went wrong:", error);
} finally {
  console.log("Cleanup if needed");
}
