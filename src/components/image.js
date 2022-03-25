import React from 'react';
import data from '../data.js';

const AlbumCover = () => {
    return <img src={data.album.images[1].url} className="image-album"/>
}

export default AlbumCover;