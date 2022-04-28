import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextField } from '@mui/material';

interface createPlaylistInterface {
    accessToken: string;
    uriTrack: string[];
    clearSelected: () => void;
};

const CreatePlaylist = ({
    accessToken, 
    uriTrack,
    clearSelected
}: createPlaylistInterface) => {

    const [form, setForm] = useState({
        title: '',
        description: ''
    });

    const handleForm = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const submitHandler = async (e: any) => {
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
            clearSelected();
            getUser();
        } else {
            alert("Title Too Short!");
            setForm({title: "", description: ""});
        };
    };

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& .MuiTextField-root': { m: 1, width: '28ch'},
                }}
            >
                <Paper elevation={8} sx={{ my: { xs: 1, md: 3 }, p: { xs: 1, md: 2 } }}>
                    <form className="form-playlist" onSubmit={submitHandler}>
                        <Typography mb={2} component="h3" variant="h5">
                            Create Playlist
                        </Typography>
                        <label htmlFor="title"></label>
                        <TextField 
                            label="Playlist Name"
                            size="small"
                            name="title"
                            onChange={handleForm} 
                            value={form.title}
                            placeholder="Your Playlist Title" 
                            color="success"
                        >
                        </TextField>
                        <label htmlFor="description"></label>
                        <TextField 
                            label="Description"
                            name="description"
                            size="small" 
                            onChange={handleForm} 
                            value={form.description}
                            placeholder="Descripstion" 
                            color="success"
                        >
                        </TextField>
                        <Button color="success" variant="contained" id="submit" type="submit">Submit</Button>
                    </form>
                </Paper>
            </Box>
      </Container>
    );
};

export default CreatePlaylist;
