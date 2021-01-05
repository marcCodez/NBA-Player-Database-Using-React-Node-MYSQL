import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Table, Button, Navbar, Form, FormControl} from 'react-bootstrap';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import PlayerDetails from './components/PlayerDetails';

import PlayerList from './components/PlayerList';

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const [file, setFile] = useState('');
  const [fileName, setFilename] = useState('Choose File');
  const [search, setSearch] = useState('');
	const [filteredUsers, setFilteredUsers] = useState([]);


  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 1000);
      fetchPlayers();
  }, [])

  
  const fetchPlayers = async () => {
    axios
    .get('http://localhost:3001/get')
    .then((response) => {
      setPlayerList(response.data)
      })
      .catch((error) => 
        console.error(`There was an error retrieving the user list: ${error}`)
      );
  }


  	// filters through database names depending on the entered query
	useEffect(()=>{
		setFilteredUsers(
      playerList.filter( (player) => {
      const fullName = `${player.first_name} ${player.last_name}`
        return fullName.toLowerCase().includes( search.toLowerCase() )
        
      })
		)
  }, [search, playerList])


  const submitPlayer = async (e) => {
    e.preventDefault();
    // setIsLoading(true)
    const formData = new FormData();
    formData.append('file', file);

    try {
   
      const res = await axios.post('http://localhost:3001/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName, filePath } = res.data;


       await axios.post('http://localhost:3001/insert', {
         firstName: firstName, 
         lastName: lastName, 
         age: age, 
         height: height, 
         position: position,
         filePath: filePath
       });
     

         setPlayerList([
           ...playerList,
           {firstName: firstName, lastName: lastName, age: age, height: height, position: position, fileName: fileName }
         ])
       

    } catch (err) {
      if(err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg);
      }
    }
 


  }

  const deletePlayer = async (id) => {
   await axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setPlayerList(playerList.filter((player) => {
      return player.id !== id
    }))
    })
  }

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name)
  }

  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ="/">

        <Navbar bg="light" expand="lg">
				
              <Navbar.Brand className="mx-auto pl-5">NBA Player Database</Navbar.Brand>
            <Form inline>
              <FormControl type="text" placeholder="Search User" className="mr-sm-2" onChange={(e) => setSearch(e.target.value)}/>
            </Form>
    
        
        </Navbar>


    <form onSubmit={submitPlayer}>
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
    <div className="custom-file">
  <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
  <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
</div>
    <input type="submit" value="Submit"/>
    </form>
    
    <PlayerList 
      playerList={filteredUsers}
      isLoading={isLoading}
      deletePlayer={deletePlayer}
    />


    </Route>
    <Route exact path="/player/:id" component={PlayerDetails} />
    </Switch>
    </div>

    </BrowserRouter>
  );
}

export default App;
