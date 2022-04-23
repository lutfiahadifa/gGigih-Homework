import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../reducer/slice';

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
            <a href={spotify_url}>LOGIN WITH SPOTIFY</a>
        </div>
    );
}

export default Login;