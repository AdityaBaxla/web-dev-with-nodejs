function factorial(n) {
    if (n == 0) return 1;
    return n * factorial(n-1);
}

function square(n) {
    return n*n
}

// module.exports = {factorial, square};

exports.fact = factorial
exports.squa = square