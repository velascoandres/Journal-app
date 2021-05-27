import { Dispatch } from 'react';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { AuthActionTypes, IAuthLoginAction } from "../reducers/authReducer";


export const startLoginEmailPassword = (email: string, password: string) => {
    return (dispatch: Dispatch<any>) => {
        setTimeout(() => {
            dispatch(
                makeLoginAction('123', 'pedro')
            );
        }, 3500);
    }
};


export const startGoogleLogin = () => {
    return (dispatch: Dispatch<any>) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(
                ({user}: firebase.auth.UserCredential) => {
                    dispatch(
                        makeLoginAction(
                            user!.uid,
                            user?.displayName as string,
                        ),
                    );
                }
            );
    };
};


const makeLoginAction = (uid: string, name: string): IAuthLoginAction => (
    {
        type: AuthActionTypes.login,
        payload: {
            name,
            uid,
        }
    }
);