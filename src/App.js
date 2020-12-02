import './App.css';
import Larder from './larder/Larder.js'
import ShoppingList from './shopping-list/ShoppingList.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to Preppers Larder!
      </header>

      <div>
        This is content
        <Larder></Larder>
        <ShoppingList/>
      </div>
    </div>
  );
}

export default App;
