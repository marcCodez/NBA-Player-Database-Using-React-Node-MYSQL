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
    position: ''
})


const { id } = useParams();
useEffect(() => {
    loadPlayer();
   
}, []);

const loadPlayer = async () => {
    // const res = await axios.get(`http://localhost:3001/player/${id}`);
//    console.log(res)
    // if (res.data[0]) {
    //     const {first_name, last_name, age, height, position} = res.data[0]
    //     setPlayerDetails({
    //         first_name,
    //         last_name, 
    //         age, 
    //         height,
    //         position
    //     })
    // }

}





    return (
        <div>
            
        </div>
    );
};

export default PlayerDetails;