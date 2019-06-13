class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
    };
  }
  handleDeleteOptions() {
    this.setState(() => {
      return {
        options: []
      };
    });
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
    this.setState(prevState => {
      return {
        options: prevState.options.concat(option)
      };
    });
  }
  render() {
    const title = "Indecision";
    const subtitle = "Afraid of choosing?";

    return React.createElement(
      'div',
      null,
      React.createElement(Header, { title: title, subtitle: subtitle }),
      React.createElement(Action, {
        hasOptions: this.state.options.length > 0,
        handlePick: this.handlePick
      }),
      React.createElement(Options, {
        options: this.state.options,
        handleDeleteOptions: this.handleDeleteOptions
      }),
      React.createElement(AddOption, {
        handleAddOption: this.handleAddOption
      })
    );
  }
}

class Header extends React.Component {
  render() {
    // console.log(this.props);
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        this.props.title
      ),
      React.createElement(
        'h2',
        null,
        this.props.subtitle
      )
    );
  }
}

class Action extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        {
          disabled: !this.props.hasOptions,
          onClick: this.props.handlePick
        },
        'What should I do?'
      )
    );
  }
}

class Options extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: this.props.handleDeleteOptions },
        'remove all'
      ),
      this.props.options.map(option => React.createElement(Option, { key: option, optionText: option }))
    );
  }
}

class Option extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      this.props.optionText
    );
  }
}

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
    this.setState(() => {
      return { error };
    });

    e.target.elements.option.value = '';
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

const jsx = React.createElement(IndecisionApp, null);

ReactDOM.render(jsx, document.getElementById('app'));
