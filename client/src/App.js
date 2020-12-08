

function App() {
  return (
    <div className="App">
    <h1>NBA Player Database</h1>
    <div className="playerForm">
    <label>Name: </label>
    <input type="text" name="playerName"/>
    <label>Age: </label><input type="text" name="playerAge"/>
    <label>Height: </label><input type="text" name="playerHeight"/>
    <label>Position:</label> <input type="text" name="playerPosition"/>
    <button>Submit</button>
    </div>
    </div>
  );
}

export default App;
