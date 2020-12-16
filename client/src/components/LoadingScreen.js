import React from 'react';
import { Row, Col } from 'react-bootstrap';

const LoadingScreen = () => {


    return (
        <tr>
            <td colspan={7}>
            <img src="/media/bball.gif" className="bball" alt="spinning-ball"/>
            <h3>Loading...</h3>
            </td>
            
        </tr>
    );
};

export default LoadingScreen;