class OldSyntax {
    constructor() {
        this.getGreeting = this.getGreeting.bind(this);
        this.name = 'Alex';
    }
    getGreeting() {
        return `Hi I am ${this.name}`
    }
}
const oldSyntax = new OldSyntax();
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());

class NewSyntax {
    name = 'Alexi';
    getGreeting = () => {
        return `Hi I am ${this.name}`
    }
}
const newSyntax = new NewSyntax();
const newGetGreeting = newSyntax.getGreeting;
console.log(newGetGreeting());