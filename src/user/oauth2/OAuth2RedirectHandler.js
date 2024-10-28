// src\user\oauth2\OAuth2RedirectHandler.js

import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../constants/index.js';
import { Navigate } from 'react-router-dom';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        // 불필요한 escape 문자 제거
        var regex = new RegExp('[?&]' + name + '=([^&#]*)');
        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    render() {
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Navigate to="/" state={{ from: this.props.location }} />;
        } else {
            return <Navigate to="/login" state={{ from: this.props.location, error: error }} />;
        }
    }
}

export default OAuth2RedirectHandler;