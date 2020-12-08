import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [position, setPosition] = useState('')

  return (
    <div className="App">
    <h1>NBA Player Database</h1>

    <div className="playerForm">
    <label>First Name: </label>
    <input type="text" name="playerName" onChange={(e) => setFirstName(e.target.value)}/>
    <label>Last Name: </label>
    <input type="text" name="playerName" onChange={(e) => setLastName(e.target.value)}/>
    <label>Age: </label>
    <input type="text" name="playerAge"/>
    <label>Height: </label>
    <input type="text" name="playerHeight"/>
    <label>Position:</label> 
    <input type="text" name="playerPosition"/>

    <button>Submit</button>
    </div>
    </div>
  );
}

export default App;
