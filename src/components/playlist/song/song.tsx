import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

interface SongInterface {
    image: string; 
    title: string;
    artist: string;
    album: string;
    duration: string;
    select: boolean;
    Selecthandler: (uri: any) => void;
    uri: string;
};

const Song = ({
    image, 
    title, 
    artist, 
    album, 
    duration,
    select,
    Selecthandler, 
    uri
}: SongInterface) => {

    return (
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
                <Paper elevation={2} sx={{ my: { xs: 1, md: 1 }, p: { xs: 1, md: 1 } }}>
                    <div className="Song">
                        <div className="image-song">
                            <img src={image} alt="album-cover" className="image-album" />
                        </div>
                        <div className='detail-song'>
                            <p>{title} </p>
                            <p>{artist} </p>
                            <p>{album}</p>
                            <p>{duration}</p>
                            <Button color="success" variant="contained" onClick={() => {Selecthandler(uri)}}>{select ? 'Deselect' : 'Select'}</Button>
                        </div>
                    </div>
                </Paper>
            </Box>
        </Container>
    )
}

export default Song;
