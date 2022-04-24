import React from 'react';

const Song = ({image, title, artist, album, Selecthandler, select, uri}) => {

    return (
        <div className="Song">
            <img src={image} alt="album-cover" className="image-album" />
            <div className='detail-song'>
                <p>{title} </p>
                <p>{artist} </p>
                <p>{album}</p>
                <button onClick={() => {Selecthandler(uri)}}>{select ? 'Deselect' : 'Select'}</button>
            </div>
        </div>
    )
}

export default Song;