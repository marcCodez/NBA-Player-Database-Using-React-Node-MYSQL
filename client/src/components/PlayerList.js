import React from 'react';
import LoadingScreen from './LoadingScreen';
import { Table, Button} from 'react-bootstrap';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';


function PlayerList(props) {
    return (
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
    
           {props.isLoading === true ? <LoadingScreen/> :  
          
          props.playerList.map((player) => {
            return (
              <tr key={player.id}>
           <td> {player.first_name}</td>
            <td>{player.last_name}</td>
            <td>{player.age}</td>
            <td>{player.height}</td>
            <td> {player.position}</td>
            <td>
              <Link variant="secondary" to={`/player/${player.id}`}>View</Link>
            </td>
            <td>
            <Button variant="danger" onClick={() => {props.deletePlayer(player.id)}}>Delete</Button>
            </td>
            </tr>
            );
          })
        
          
          
            } 
         
           
          
        </tbody>
        </Table> 
    )
}

export default PlayerList
