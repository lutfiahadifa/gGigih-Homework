import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../reducer/slice';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Button';

const Login = () => {

    const dispatch = useDispatch();

    var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    var scope = 'playlist-modify-private user-read-private';
    var redirect_uri = 'http://localhost:3000';

    var spotify_url = 'https://accounts.spotify.com/authorize';
        spotify_url += '?response_type=token';
        spotify_url += '&client_id=' + encodeURIComponent(client_id);
        spotify_url += '&scope=' + encodeURIComponent(scope);
        spotify_url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

    useEffect(() => {
        const queryString = new URL(window.location.href.replace("#", "?"))
        .searchParams;
        const Accesstoken = queryString.get("access_token");
        dispatch(setAccessToken(Accesstoken));
    }, [dispatch]);


    return (
        <div className="login">
            <h1>SPOTIFY REACT</h1>
            <Grid>
                <Button color="success" variant="contained" href={spotify_url}>LOGIN WITH SPOTIFY</Button>
            </Grid>
        </div>
    );
}

export default Login;
