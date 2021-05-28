import { Dispatch } from 'react';
import Swal from 'sweetalert2'


import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { AuthActionTypes, IAuthLoginAction, IAuthLogoutAction } from '../reducers/authReducer';
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
                    Swal.fire('Error', error.message, 'error');
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
                },
            )
            .catch(
                error => {
                    dispatch(finishLoading());
                    Swal.fire('Error', error.message, 'error');
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
                    Swal.fire('Error', error.message, 'error');
                    dispatch(finishLoading());
                }
            )
    };
};


export const makeLoginAction = (uid: string, name: string): IAuthLoginAction => (
    {
        type: AuthActionTypes.login,
        payload: {
            name,
            uid,
        }
    }
);


export const startLogout = () => {
    return (dispatch: Dispatch<any>) => {
        firebase
            .auth()
            .signOut()
            .then(
                () => {
                    dispatch(logout());
                },
            )
            .catch(
                error => {
                    Swal.fire('Error', error.message, 'error');
                },  
            );
    }
};


export const logout = (): IAuthLogoutAction => (
    {
        type: AuthActionTypes.logout,
    }
);
