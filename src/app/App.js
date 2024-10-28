import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 삭제
import AppHeader from '../user/common/AppHeader';
import Login from '../user/home/Login';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../user/common/NotFound';
import LoadingIndicator from '../user/common/LoadingIndicator';
import { ACCESS_TOKEN } from '../user/constants/index.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            loading: true
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({ authenticated: false });
        toast.success("You're safely logged out!");
    }

    componentDidMount() {
        this.setState({ loading: false });
    }

    render() {
        if (this.state.loading) {
            return <LoadingIndicator />;
        }

        return (
            <div className="app">
                <div className="app-top-box">
                    <AppHeader
                        authenticated={this.state.authenticated}
                        onLogout={this.handleLogout} />
                </div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        );
    }
}

export default App;
