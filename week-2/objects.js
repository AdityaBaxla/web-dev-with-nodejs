class Dog {
  constructor(breed, name) {
    this.breed = breed;
    this.name = name;
  }

  speak() {
    console.log(`${this.name} says woof woff!!`);
  }
}

const dog1 = new Dog("husky", "Hachi");
const dog2 = new Dog("german shepard", "Bruno");

const { breed: myDogBreed } = dog1; // Object Destructuring

const dog3 = { ...dog1 }; // ... -> spread operator (shallow copy)

dog1.name = "Tiger";
console.log(dog1.name);
console.log(dog3.name);
