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



    return (
        <div>
       
            <h1>{first_name}</h1>
            <h1>{last_name}</h1>
   
            <img style={{ width: '100%' }} src={`../..${img}`} alt=''/>

            
        </div>
    );
};

export default PlayerDetails;