class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }
  componentDidMount(){
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        this.setState(() => ({ options: options }))
      }
    } catch (e){
      // do nothing if error, will fall back to empty array
    }
  }
  componentDidUpdate(prevProps, prevState){
    if (prevState.options.length !== this.state.options.length) {
      console.log('saving data');
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount(){
    console.log('unmount');
  }
  handleDeleteOptions(){
    this.setState(() => ({ options: [] }));
  }
  handlePick(){
    const randomNum = Math.floor(this.state.options.length * Math.random());
    alert(this.state.options[randomNum]);
  }
  handleAddOption(option){
    if (!option) {
      return 'Enter valid value';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Duplicate';
    }
    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  }
  handleDeleteOption(optionToRemove){
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== optionToRemove)
    }));
  }
  render(){
    const subtitle = "Afraid of choosing?";

    return(
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: 'DecidoR'
};

const Action = (props) => {
  return (
    <div>
      <button
        disabled={!props.hasOptions}
        onClick={props.handlePick}
      >
        What should I do?
        </button>
    </div>
  );
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>remove all</button>
      {props.options.length === 0 && <p>Add an option...</p>}
      {
        props.options.map((option) => 
          <Option 
            key={option}
            handleDeleteOption={props.handleDeleteOption} 
            optionText={option} />
        )
      }
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button 
        onClick={(e) => {
            props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e){
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));
    
    if (!error) {
      e.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleAddOption}>
        <input type="text" name="option"></input>
        <button>add option</button>
        {this.state.error && <p>{this.state.error}</p>}
        </form>
      </div>
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

ReactDOM.render(<IndecisionApp options={['no. one', 'no. two']}/>, document.getElementById('app'));