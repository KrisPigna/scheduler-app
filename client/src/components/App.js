import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Landing from './landing/Landing';
import './App.css';
import { Provider } from 'react-redux';
import store from '../store'

class App extends Component {
    render() {
        return (
            <Router>
                <Provider store={store}>
                    <div className="container">
                        <Route exact path="/" component={Landing} />
                        <Route path="/dashboard" component={Dashboard} />
                    </div>
                </Provider>
            </Router>
        );
    }
}

export default App;