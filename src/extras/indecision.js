const app = {
    title: 'Indecision',
    subtitle: 'More info',
    options: ['one', 'two']
};

const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.option.value);
    const option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render();
    }
}

const removeAll = () => {
    app.options = [];
    render();
}

const makeChoice = () => {
    const randomNum = Math.floor(app.options.length * Math.random());
    const choice = app.options[randomNum];
    alert(choice);
}

const appRoot = document.getElementById('app');

const render = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 'Here are your options' : 'no options'}</p>
            <button disabled={!app.options.length} onClick={makeChoice}>Which one?</button>
            <button onClick={removeAll}>Remove all</button>
            <ol>
                {app.options.map((option) =>
                    <li key={option}>{option}</li>
                )}
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);
}

render();