import { Reducer } from 'react';
import { IBasicAction } from './interfaces/basic-action.interface';

export type AuthState = {
    uid: string;
    name: string;
}


export enum AuthActionTypes {
    login = '[Auth] Login',
    logout = '[Auth] Logout',
    register = '[Auth] Register',
}


export interface ILoginPayload {
    name: string;
    uid: string;
}

export interface IAuthLoginAction extends IBasicAction<AuthActionTypes.login> {
    payload: ILoginPayload;
}

export interface IAuthRegisterAction extends IBasicAction<AuthActionTypes.register> {
    payload: Record<string, any>;
}

export interface IAuthLogoutAction extends IBasicAction<AuthActionTypes.logout> { }



export const initialAuthState: AuthState = {
    uid: '',
    name: '',
}

export const authReducer: Reducer<AuthState, IBasicAction<AuthActionTypes>> = (state: AuthState, action: IBasicAction<AuthActionTypes>): AuthState => {

    switch (action.type) {
        case AuthActionTypes.login:
            return {
                name: action.payload.name,
                uid: action.payload.uid,
            };
        case AuthActionTypes.logout:
            return {
                name: '',
                uid: '',
            };

        default:
            break;
    }
    return {
        ...state,
    };

}