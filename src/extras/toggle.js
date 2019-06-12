const appRoot = document.getElementById('app');

let visible = false;

const toggleVisibility = () => {
  visible = !visible
  render();
}


const render = () => {
  const jsx = (
    <div>
      <h1>Visibility</h1>
      <button onClick={toggleVisibility}>
        {visible ? 'Hide details' : 'Show details'}
      </button>
      {visible && (
        <p>some text that was hidden... but now isn't</p>
      )}
    </div>
  );

  ReactDOM.render(jsx, appRoot);
}

render();