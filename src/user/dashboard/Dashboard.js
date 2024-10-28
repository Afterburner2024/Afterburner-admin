// src\dashboard\Dashboard.js

import React, { Component } from 'react';
import './Dashboard.css';

class Dashboard extends Component {
    render() {
        const { currentUser } = this.props;

        return (
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <h1 className="dashboard-title">Welcome, {currentUser ? currentUser.name : 'User'}!</h1>
                    <p className="dashboard-description">
                        You have successfully logged in. Here is your profile information:
                    </p>
                    {currentUser ? (
                        <div className="user-info">
                            <p><strong>Name:</strong> {currentUser.name}</p>
                            <p><strong>Email:</strong> {currentUser.email}</p>
                            <img src={currentUser.imageUrl} alt={currentUser.name} className="user-avatar"/>
                        </div>
                    ) : (
                        <p>Loading your profile information...</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Dashboard;
