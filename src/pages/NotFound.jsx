import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>We Hit a Brick Wall</h1>
            <Link to='/'> Go Back Home</Link>
        </div>
    );
};

export default NotFound;
