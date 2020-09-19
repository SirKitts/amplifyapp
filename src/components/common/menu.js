import React from 'react';
import {Link} from "react-router-dom";
import '../../assets/css/menu.scss';

const Menu = () => (
    <div className="container">
        <div className="scrollmenu">
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/car">Car</Link>
        </div>
    </div>
);

export default Menu;
