import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { makeLoginAction } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState<boolean>(true);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged(
                (user: firebase.User | null) => {
                    if (user !== null && user?.uid) {
                        dispatch(makeLoginAction(user.uid, user.displayName ?? ''));
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                    setChecking(false);
                }
            );
    }, [dispatch, setChecking, setIsLoggedIn]);


    if (checking) {
        return (
            <div>
                Espere....
            </div>
        );
    }


    return (
        <>
            <Router>
                <div>
                    <Switch>

                        <PublicRoute
                            isAuthenticated={isLoggedIn}
                            path="/auth"
                            component={AuthRouter}
                        />


                        <PrivateRoute
                            isAuthenticated={isLoggedIn}
                            path="/"
                            component={JournalScreen}
                        />

                        <Redirect 
                            to="/auth/login"
                        />


                    </Switch>
                </div>
            </Router>
        </>
    );
};


