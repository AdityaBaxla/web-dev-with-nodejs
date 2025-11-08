function greet(roll_no) {
  console.log("Hi I'm " + this.f_name + " with roll no :" + roll_no);
}

const person = { f_name: "Charlie" };

greet.call(person, 100102);

greet.apply(person, [7891]);

const binded = greet.bind(person);

binded(5555);
