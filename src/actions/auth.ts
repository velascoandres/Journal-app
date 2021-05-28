import { Dispatch } from 'react';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';

import { AuthActionTypes, IAuthLoginAction } from '../reducers/authReducer';
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword = (email: string, password: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(startLoading());
        firebase
            .auth()
            .signInWithEmailAndPassword(
                email, password
            )
            .then(
                ({ user }: firebase.auth.UserCredential) => {
                    dispatch(
                        makeLoginAction(user?.uid as string, user?.displayName as string)
                    );
                    dispatch(finishLoading());
                }
            )
            .catch(
                error => {
                    dispatch(finishLoading());
                    console.error(error);
                }
            );
    };
};


export const startRegisterWithEmailPasswordName = (
    email: string,
    password: string,
    name: string,
) => {

    return (dispatch: Dispatch<any>) => {
        dispatch(startLoading());
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(
                async ({ user }: firebase.auth.UserCredential) => {
                    await user?.updateProfile({ displayName: name, });
                    dispatch(
                        makeLoginAction(
                            user!.uid,
                            user?.displayName as string,
                        ),
                    );
                    dispatch(finishLoading());
                }
            )
            .catch(
                e => {
                    dispatch(finishLoading());
                    console.error(e);
                }
            );
    }
}


export const startGoogleLogin = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(startLoading());
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(
                ({ user }: firebase.auth.UserCredential) => {
                    dispatch(
                        makeLoginAction(
                            user!.uid,
                            user?.displayName as string,
                        ),
                    );
                    dispatch(finishLoading());
                }
            )
            .catch(
                error => {
                    console.error(error);
                    dispatch(finishLoading());
                }
            )
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