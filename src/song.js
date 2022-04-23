import React, { useState } from 'react';

const Song = ({image, title, artist, album, handlerSelect, uri}) => {

    const [select, setSelect] = useState(false);

    const Selecthandler = () => {
        setSelect(!select);
        handlerSelect(uri);
    }

    return (
        <table className="Song">
            <tbody>
                <tr>
                    <td className='img'><img src={image} alt="album-cover" className="image-album" /></td>
                    <td className='detail-song'>
                        <p>{title} </p>
                        <p>{artist} </p>
                        <p>{album}</p>
                        <button onClick={Selecthandler}>{select ? 'Deselect' : 'Select'}</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Song; 