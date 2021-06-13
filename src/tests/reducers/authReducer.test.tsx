import { AuthActionTypes, authReducer, AuthState, IAuthLoginAction, IAuthLogoutAction } from "../../reducers/authReducer";
import { IBasicAction } from "../../reducers/interfaces/basic-action.interface";

describe('Pruebas en authReducer', () => {

    test('Debe de realizar el login', () => {

        const initState: AuthState = {
            name: '',
            uid: '',
        };


        const action: IAuthLoginAction = {
            type: AuthActionTypes.login,
            payload: {
                uid: '1231',
                name: 'Andres',
            }
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(
            {
                uid: '1231',
                name: 'Andres',
            },
        );


    });


    test('Debe de realizar el logout', () => {

        const initState: AuthState = {
            name: '1231',
            uid: 'Andres',
        };


        const action: IAuthLogoutAction = {
            type: AuthActionTypes.logout
        };

        const state = authReducer(initState, action);

        expect(state).toEqual(
            {
                uid: '',
                name: '',
            },
        );


    });


    test('Debe de retornar el mismo estado', () => {

        const initState: AuthState = {
            name: '1231',
            uid: 'Andres',
        };


        const action: IBasicAction<''> = {
            type: ''
        };

        const state = authReducer(initState, action as any);

        expect(state).toEqual(
            {
                name: '1231',
                uid: 'Andres',
            },
        );


    });


})
