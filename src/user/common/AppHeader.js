//src\user\common\AppHeader.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import afterburnerLogo from '../img/afterburner-logo.png'; // 이미지 경로 추가
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">
                            <img src={afterburnerLogo} alt="Afterburner Logo" className="logo" /> {/* 이미지 추가 */}
                        </Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                            {this.props.authenticated ? (
                                <ul>
                                    <li>
                                        <button onClick={this.props.onLogout} className="logout-button">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            ) : null}
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}

export default AppHeader;

