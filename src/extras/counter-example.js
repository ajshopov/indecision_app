let count = 0;
const addOne = () => {
    count++;
    renderCounter();
};
const minusOne = () => {
    count--;
    renderCounter();
};
const reset = () => {
    count = 0;
    renderCounter();
}

const appRoot = document.getElementById('app');

const renderCounter = () => {
    const templateTwo = (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addOne}>+1</button>
            <button onClick={minusOne}>-1</button>
            <button onClick={reset}>reset</button>
        </div>
    );

    ReactDOM.render(templateTwo, appRoot);
};

renderCounter();