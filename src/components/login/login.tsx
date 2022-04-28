import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../reducer/slice';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Button';

const Login = () => {

    const dispatch = useDispatch();

    var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    var scope = 'playlist-modify-private user-read-private';
    var redirect_uri = 'http://g-gigih-homework.vercel.app/';

    var spotify_url = 'https://accounts.spotify.com/authorize';
        spotify_url += '?response_type=token';
        spotify_url += '&client_id=' + client_id;
        spotify_url += '&scope=' + scope;
        spotify_url += '&redirect_uri=' + redirect_uri;

    useEffect(() => {
        const queryString = new URL(window.location.href.replace("#", "?"))
        .searchParams;
        const Accesstoken = queryString.get("access_token");
        dispatch(setAccessToken(Accesstoken));
    }, [dispatch]);


    return (
        <div className="login">
            <div className="login-content">
                <h1>Playlistify</h1>
                <Grid>
                    <Button className="login-button" color="success" variant="contained" href={spotify_url}>LOGIN WITH SPOTIFY</Button>
                </Grid>
            </div>
        </div>
    );
};

export default Login;
