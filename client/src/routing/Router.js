import React from 'react';
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import Voting from '../components/Voting';
import Results from '../components/Results';
import Home from '../components/Home';
import VoterRegistration from '../components/VoterRegistration';

const Routing = () => {
    return (
    <Router>
        <div>
            <VoterRegistration/>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/voting">Voting</Link></li>
                <li><Link to="/results">Results</Link></li>
                <li><Link to="/register">Voter Registration</Link></li>
            </ul>
            <Switch>
                <Route exact path="/" component = {Home}/>
                <Route path ="/voting" component = {Voting}/>
                <Route path = "/results" component={Results}/>
                <Router path = "/register" component={VoterRegistration}/>
            </Switch>
        </div>
    </Router>);
};

export default Routing;