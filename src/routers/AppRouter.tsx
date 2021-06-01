import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebase-config';
import { makeLoginAction } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadNotes } from '../actions/notes';

export const AppRouter: React.FC = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState<boolean>(true);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


    useEffect(() => {
        firebase
            .auth()
            .onAuthStateChanged(
                async (user: firebase.User | null) => {
                    if (user?.uid) {
                        dispatch(makeLoginAction(user.uid, user.displayName ?? ''));
                        setIsLoggedIn(true);
                        dispatch(startLoadNotes());
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
                Wait....
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


