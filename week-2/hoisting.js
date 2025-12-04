console.log(whichTree);

var whichTree = function () {
  // let tree; (TDZ)
  let tree = "Orange";
  console.log(`${tree} tree`);
};

var a; // declaration
a = 10; // initialization

// function declaration
function abc() {}
// function expression
let b = function () {
  return 1 + 2;
};
