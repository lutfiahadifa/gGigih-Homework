import React from 'react';

const Song = ({image, title, artist, album}) => {
    return <div className="Song-playlist">
        <img src={image} className="image-album" />
        <p>Title: {title} </p>
        <p>Artist: {artist} </p>
        <p>Album: {album}</p>
        <button>Select</button>
    </div>
}

export default Song;