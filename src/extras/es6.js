var nameVar = 'Al';
var nameVar = 'Steve';
console.log('nameVar', nameVar);

let nameLet = 'Al';
nameLet = 'Steve';
// let nameLet = 'Jean';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
console.log('nameConst', nameConst);
// nameConst = 'Steph';


var fullName = 'Alex Shop';
// let firstName;

// block scoping
if (fullName) {
    let firstName = fullName.split(' ')[0]
    console.log(firstName);
}

console.log(firstName);