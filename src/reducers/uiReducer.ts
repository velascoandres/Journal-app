import { Reducer } from "react";
import { IBasicAction } from "./interfaces/basic-action.interface"

export type UIState = {
    loading: boolean;
    msgError: string | null;
}


export enum UIActionsTypes {
    uiSetError = '[UI] Set Error',
    uiRemoveError = '[UI] Remove Error',
}

export interface IUISetErrorAction extends IBasicAction<UIActionsTypes> {
    type: UIActionsTypes.uiSetError,
    payload: string;
}


export interface IUIRemoveErrorAction extends IBasicAction<UIActionsTypes> {
    type: UIActionsTypes.uiRemoveError,
}



const initialState: UIState = {
    loading: false,
    msgError: null,
};


export const uiReducer: Reducer<UIState, IBasicAction<UIActionsTypes>> = (state: UIState = initialState, action: IBasicAction<UIActionsTypes>) => {
    switch (action.type) {
        case UIActionsTypes.uiSetError:
            return {
                ...state,
                msgError: action.payload,
                loading: false,
            };
            case UIActionsTypes.uiRemoveError:
                return {
                    ...state,
                    msgError: null,
                    loading: false,
                };
            default:
                return {
                    ...state,
                };
    }
};
