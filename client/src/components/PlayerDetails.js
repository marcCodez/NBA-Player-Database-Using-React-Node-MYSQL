import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'rect-router-dom';
import { Button, Nav, Navbar, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";

const PlayerDetails = () => {
const [playerDetails, setPlayerDetails] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    height: 0,
    position: ''
})

const { id } = useParams();

const loadPlayer = async () => {
    const res = await ax
}

    return (

    )
}