import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import Particles from 'react-particles-js';
import { PARTICLES_CONFIG } from '../constants/particles-config';

export const AppRouter = () => {
    return (
        <>
            <Particles
                params={PARTICLES_CONFIG}
            />
            <Router>
                <div>
                    <Switch>
                        <Route path="/auth" component={AuthRouter} />
                        <Route path="/" component={JournalScreen} exact />
                        <Redirect to="/auth/login" />
                    </Switch>
                </div>
            </Router>
        </>
    );
};

