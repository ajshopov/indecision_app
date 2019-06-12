const app = {
  title: 'Indecision',
  subtitle: 'More info',
  options: ['one', 'two']
};

const onFormSubmit = e => {
  e.preventDefault();
  // console.log(e.target.elements.option.value);
  const option = e.target.elements.option.value;

  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};

const removeAll = () => {
  app.options = [];
  render();
};

const makeChoice = () => {
  const randomNum = Math.floor(app.options.length * Math.random());
  const choice = app.options[randomNum];
  alert(choice);
};

const appRoot = document.getElementById('app');

const render = () => {
  const template = React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      app.title
    ),
    app.subtitle && React.createElement(
      'p',
      null,
      app.subtitle
    ),
    React.createElement(
      'p',
      null,
      app.options.length > 0 ? 'Here are your options' : 'no options'
    ),
    React.createElement(
      'button',
      { disabled: !app.options.length, onClick: makeChoice },
      'Which one?'
    ),
    React.createElement(
      'button',
      { onClick: removeAll },
      'Remove all'
    ),
    React.createElement(
      'ol',
      null,
      app.options.map(option => React.createElement(
        'li',
        { key: option },
        option
      ))
    ),
    React.createElement(
      'form',
      { onSubmit: onFormSubmit },
      React.createElement('input', { type: 'text', name: 'option' }),
      React.createElement(
        'button',
        null,
        'Add Option'
      )
    )
  );

  ReactDOM.render(template, appRoot);
};

render();
