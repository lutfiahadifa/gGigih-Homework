import React, { useState } from 'react';
import axios from 'axios';

const CreatePlaylist = ({accessToken, uriTrack, clearSelect}) => {

    const [form, setForm] = useState({
        title: '',
        description: ''
    })
    const handleForm = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }
    const submitHandler = async e => {
        e.preventDefault();
        console.log(form);
        if (form.title.length > 10) {
            const header = { Authorization: `Bearer ${accessToken}` };
            const getUser = async () => {
                 await axios
                    .get(
                        `https://api.spotify.com/v1/me`,
                        {
                            headers: header
                        }
                    )
                .then ((res) => {
                    let user_id = res.data.id;
                    axios
                    .post(
                        `https://api.spotify.com/v1/users/${user_id}/playlists`,
                        {
                            name: form.title,
                            description: form.description,
                            public: false,
                            collaborative: false,
                        },{
                            headers: header
                        }
                    )
                    .then((res) => {
                        let playlist_id = res.data.id;
                        axios
                            .post(
                                `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
                                {
                                    uris: [...uriTrack]
                                },{
                                    headers:header
                                }
                            )
                    });
                })
                .catch ((err)=> {
                    console.log(err);
                })
                alert("Playlist Created!");
                setForm({title: "", description: ""});
            }
            getUser();
        } else {
            alert("Title Too Short!");
            setForm({title: "", description: ""});
        };
    }
    return(
        <div>
            <form className="form-playlist" onSubmit={submitHandler}>
                <h3>Create Playlist</h3>
                <label htmlFor="title">Playlist Title</label><br/>
                <input 
                    name="title" 
                    onChange={handleForm} 
                    value={form.title}
                    placeholder="Your Playlist Title" 
                    required>
                </input><br/>
                <label htmlFor="description">Description</label><br/>
                <textarea 
                    name="description" 
                    onChange={handleForm} 
                    value={form.description}
                    placeholder="Descripstion" 
                    required>
                </textarea><br/>
                <button id="submit" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreatePlaylist;