// arguments not bound
const add = function (a, b) {
    console.log(arguments);
    return a + b;
};

console.log(add(4,5));

const addArrow = (a, b) => {
    // console.log(arguments); // no binding
    return a + b;
};

console.log(addArrow(6, 5));

// this keyword not bound

// const user = {
//     name: 'Kevin',
//     colours: ['red', 'green', 'blue'],
//     printColours: function () {
//         console.log(this.colours);

//         this.colours.forEach(function (colour) {
//             console.log(`${this.name} likes ${colour}`)
//         });
//     }
// }

const user = {
    name: 'Kevin',
    colours: ['red', 'green', 'blue'],
    // binding to access name
    printColours() {
        // console.log(this.colours);
        // not binding, can still access name
        // this.colours.forEach((colour) => {
        //     console.log(`${this.name} likes ${colour}`)
        // });

        return this.colours.map((colour) => `${this.name} likes ${colour}`);
    }
}

console.log(user.printColours());


const multiplier = {
    numbers: [1,2,3,4],
    multiplyBy: 7,
    multiply(){
        return this.numbers.map((num) => num * this.multiplyBy);
    }
}

console.log(multiplier.multiply());