import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function App() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [height, setHeight] = useState(0)
  const [position, setPosition] = useState('')
  const [playerList, setPlayerList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/nbadb/get').then((response) => {
    setPlayerList(response.data)
    })
  })

  const submitPlayer = () => {
    axios.post('http://localhost:3001/nbadb/insert', {
      firstName: firstName, 
      lastName: lastName, 
      age: age, 
      height: height, 
      position: position
    }).then(() => {
      setPlayerList([
        ...playerList,
        {firstName: firstName, lastName: lastName, age: age, height: height, position: position }
      ])
    })

      
  }

  const deletePlayer = (id) => {
    axios.delete('http://localhost:3001/nbadb/delete/', () => {

    })
  }

  return (
    <div className="App">
    <h1>NBA Player Database</h1>

    <div className="form">
    <label>First Name: </label>
    <input type="text" onChange={(e) => setFirstName(e.target.value)}/>
    <label>Last Name: </label>
    <input type="text" onChange={(e) => setLastName(e.target.value)}/>
    <label>Age: </label>
    <input type="number" onChange={(e) => setAge(e.target.value)}/>
    <label>Height: </label>
    <input type="number" onChange={(e) => setHeight(e.target.value)}/>
    <label>Position:</label> 
    <input type="text" onChange={(e) => setPosition(e.target.value)}/>

    <button onClick={submitPlayer}>Submit</button>
  
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Age</th>
        <th>Height</th>
        <th>Position</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     
        {playerList.map((player, key) => {
          return (
            <tr>
         <td> {player.first_name}</td>
          <td>{player.last_name}</td>
          <td>{player.age}</td>
          <td>{player.height}</td>
          <td> {player.position}</td>
          <td>
            <Button variant="secondary">Update</Button>
          </td>
          <td>
          <Button variant="danger" onClick={() => {deletePlayer(player.id)}}>Delete</Button>
          </td>
          </tr>
          );
        })}
      
    </tbody>
    </Table>
    </div>
    </div>
  );
}

export default App;
