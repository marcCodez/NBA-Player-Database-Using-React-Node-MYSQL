import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function App() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [position, setPosition] = useState('')
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/nbadb/get').then((response) => {
    setPlayerList(response.data)
    })
  })

  const submitPlayer = () => {
    axios.post("http://localhost:3001/nbadb/insert", {
      firstName: firstName, 
      lastName: lastName, 
      age: age, 
      height: height, 
      position: position
    }).then(() => {
      alert("player submitted sucessfully")
    })
  }

  return (
    <div className="App">
    <h1>NBA Player Database</h1>

    <div className="form">
    <label>First Name: </label>
    <input type="text" name="playerName" onChange={(e) => setFirstName(e.target.value)}/>
    <label>Last Name: </label>
    <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
    <label>Age: </label>
    <input type="number" name="playerAge" onChange={(e) => setAge(e.target.value)}/>
    <label>Height: </label>
    <input type="number" name="playerHeight" onChange={(e) => setHeight(e.target.value)}/>
    <label>Position:</label> 
    <input type="text" name="playerPosition" onChange={(e) => setPosition(e.target.value)}/>

    <button onClick={submitPlayer}>Submit</button>
  
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Height</th>
        <th>Position</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        {playerList.map((player) => {
          return (
            <>
          <td>{player.firstName}</td>
          <td>{player.lastName}</td>
          <td>{player.age}</td>
          <td>{player.height}</td>
          <td>{player.location}</td>
          </>
          );
        })}
      </tr>
    </tbody>
    </Table>
    </div>
    </div>
  );
}

export default App;
