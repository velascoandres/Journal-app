import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Particles from 'react-particles-js';

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { PARTICLES_CONFIG } from '../constants/particles-config';

export const AuthRouter = () => {
    return (
        <div className="auth__container">
            <Particles
                params={PARTICLES_CONFIG}
            />
            <div className="auth__box-container">
                <Switch>
                    <Route
                        exact
                        path="/auth/login"
                        component={LoginScreen}
                    />

                    <Route
                        exact
                        path="/auth/register"
                        component={RegisterScreen}
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>

        </div>

    );
};


