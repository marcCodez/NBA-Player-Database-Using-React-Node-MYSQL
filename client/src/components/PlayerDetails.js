import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Nav, Navbar, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";

const PlayerDetails = () => {
const [playerDetails, setPlayerDetails] = useState({
    first_name: '',
    last_name: '',
    age: 0,
    height: 0,
    position: '',
    img: ''
});

const [editMode, setEditMode] = useState(false)


const {first_name, last_name, age, height, position, img} = playerDetails;


const { id } = useParams();
useEffect(() => {
    loadPlayer();
}, []);

const loadPlayer = async () => {
    const res = await axios.get(`http://localhost:3001/player/${id}`);
    if (res.data[0]) {
        const {first_name, last_name, age, height, position, img} = res.data[0]
        setPlayerDetails({
            first_name,
            last_name, 
            age, 
            height,
            position,
            img
        })
    }

}

 const changeEditMode = () => {
    setEditMode(!editMode)
}

const renderEditView = () => {
    return <div>
         <Button variant="danger" onClick={changeEditMode}>x Cancel</Button>
         <Button variant="success" onClick={changeEditMode}>✓ Save Changes</Button>
         
<Card  className="mx-auto mt-3" style={{ width: '25rem' }}>
    <Card.Img variant="top" src={`../..${img}`} />
    <ListGroup className="list-group-flush">
      <ListGroupItem><span className="font-weight-bold">First Name: </span> <input placeholder={first_name} type="text"/></ListGroupItem>
      <ListGroupItem><span className="font-weight-bold">Last Name: </span><input placeholder={last_name} type="text"/></ListGroupItem>
      <ListGroupItem><span className="font-weight-bold">Age:   </span><input placeholder={age} type="text"/></ListGroupItem>
    </ListGroup>
  </Card>
  </div>
}

const renderDefaultView = () => {
return <div>
<Card  className="mx-auto mt-3" style={{ width: '25rem' }}>
    <Card.Img variant="top" src={`../..${img}`} />
    <ListGroup className="list-group-flush">
      <ListGroupItem><span className="font-weight-bold">First Name: </span>{first_name}</ListGroupItem>
      <ListGroupItem><span className="font-weight-bold">Last Name: </span>{last_name}</ListGroupItem>
      <ListGroupItem><span className="font-weight-bold">Age: </span>{age}</ListGroupItem>
    </ListGroup>
  </Card>
  </div>
}


    return (
        <div>

<Navbar bg="light" expand="lg">
      <Link className="btn btn-dark" to="/">
        Back
      </Link>
      <Navbar.Brand className="mx-auto pr-5">Player Profile</Navbar.Brand>
	
      <Button onClick={changeEditMode}>Edit</Button>
			</Navbar>

           

{ editMode === true ? 
renderEditView() :
renderDefaultView()
}


            
        </div>
    );
};

export default PlayerDetails;