class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options: options }));
      }
    } catch (e) {
      // do nothing if error, will fall back to empty array
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      console.log('saving data');
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('unmount');
  }
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handlePick() {
    const randomNum = Math.floor(this.state.options.length * Math.random());
    alert(this.state.options[randomNum]);
  }
  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Duplicate';
    }
    this.setState(prevState => ({
      options: prevState.options.concat(option)
    }));
  }
  handleDeleteOption(optionToRemove) {
    this.setState(prevState => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }
  render() {
    const subtitle = "Afraid of choosing?";

    return React.createElement(
      'div',
      null,
      React.createElement(Header, { subtitle: subtitle }),
      React.createElement(Action, {
        hasOptions: this.state.options.length > 0,
        handlePick: this.handlePick
      }),
      React.createElement(Options, {
        options: this.state.options,
        handleDeleteOptions: this.handleDeleteOptions,
        handleDeleteOption: this.handleDeleteOption
      }),
      React.createElement(AddOption, {
        handleAddOption: this.handleAddOption
      })
    );
  }
}

const Header = props => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    props.subtitle && React.createElement(
      'h2',
      null,
      props.subtitle
    )
  );
};

Header.defaultProps = {
  title: 'Decidor'
};

const Action = props => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        disabled: !props.hasOptions,
        onClick: props.handlePick
      },
      'What should I do?'
    )
  );
};

const Options = props => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      { onClick: props.handleDeleteOptions },
      'remove all'
    ),
    props.options.length === 0 && React.createElement(
      'p',
      null,
      'Add an option...'
    ),
    props.options.map(option => React.createElement(Option, {
      key: option,
      handleDeleteOption: props.handleDeleteOption,
      optionText: option }))
  );
};

const Option = props => {
  return React.createElement(
    'div',
    null,
    props.optionText,
    React.createElement(
      'button',
      {
        onClick: e => {
          props.handleDeleteOption(props.optionText);
        }
      },
      'remove'
    )
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { onSubmit: this.handleAddOption },
        React.createElement('input', { type: 'text', name: 'option' }),
        React.createElement(
          'button',
          null,
          'add option'
        ),
        this.state.error && React.createElement(
          'p',
          null,
          this.state.error
        )
      )
    );
  }
}

// const User = (props) => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: {props.age}</p>
//     </div>
//   );
// };

ReactDOM.render(React.createElement(IndecisionApp, { options: ['no. one', 'no. two'] }), document.getElementById('app'));
