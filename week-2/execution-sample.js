var a = 20;
const c = "js";

function programming() {
  let language = "javascipt";

  function feature() {
    let type = "object oriented";
    console.log(`${language} is ${type}`);
  }
  feature();
}

programming();

function a() {
  b();
}
function b() {
  c();
}
function c() {
  console.log("Hello");
}
function d() {
  console.log("Just Me");
}
d();
a();
