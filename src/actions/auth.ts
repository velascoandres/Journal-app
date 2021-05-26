import { AuthActionTypes, IAuthLoginAction } from "../reducers/authReducer";

export const makeLoginAction = (uid: string, name: string): IAuthLoginAction => (
    {
        type: AuthActionTypes.login,
        payload: {
            name,
            uid,
        }
    }
);