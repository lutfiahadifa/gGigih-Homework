import React from 'react';
import data from '../data.js';

const Artist = () => {
    return <div>
        <p>Artist : {data.album.artists[0].name} </p>
    </div>
}

export default Artist;