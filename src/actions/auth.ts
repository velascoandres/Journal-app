import { Dispatch } from 'react';
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


const makeLoginAction = (uid: string, name: string): IAuthLoginAction => (
    {
        type: AuthActionTypes.login,
        payload: {
            name,
            uid,
        }
    }
);