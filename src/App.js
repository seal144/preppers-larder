import './App.css';
import Larder from './larder/Larder.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Preppers Larder!
      </header>

      <div>
        This is content
        <Larder></Larder>
      </div>
    </div>
  );
}

export default App;
