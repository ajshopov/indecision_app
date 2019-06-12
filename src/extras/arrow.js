function square(x) {
    return x * x;
}

console.log(square(3));

const squareArrow = (x) => {
    return x * x;
}

console.log(squareArrow(4));

const sqrArrow = x => x * x;

console.log(sqrArrow(5));

const getFirstName = fullName => fullName.split(' ')[0];

console.log(getFirstName('John Smith'));