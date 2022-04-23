import React from "react";

const Login = ({login_url}) => {

    return (
        <div className="login">
            <a href={login_url}>LOGIN WITH SPOTIFY</a>
        </div>
    );
}

export default Login;