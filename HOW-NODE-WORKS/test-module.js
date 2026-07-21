class Calculator {
  add(a, b) {
    return a + b;
  }

  sub(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }
}

const calculator = new Calculator();

export default calculator; // modern ES6 way
//or
// export default Calculator; // export the class and import it and make object by using new

// module.exports = Calculator; // legacy code common js, import using require.
