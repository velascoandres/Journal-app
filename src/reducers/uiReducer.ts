import { Reducer } from "react";
import { IBasicAction } from "./interfaces/basic-action.interface"

export type UIState = {
    loading: boolean;
    msgError: string | null;
}


export enum UIActionsTypes {
    uiSetError = '[UI] Set Error',
    uiRemoveError = '[UI] Remove Error',
    uiStartLoading = '[UI] Start loading',
    uiFinishLoading = '[UI] Finish loading'
}

export interface IUISetErrorAction extends IBasicAction<UIActionsTypes> {
    type: UIActionsTypes.uiSetError;
    payload: string;
}


export interface IUIRemoveErrorAction extends IBasicAction<UIActionsTypes> {
    type: UIActionsTypes.uiRemoveError;
}

export interface IUIStartLoadinAction extends IBasicAction<UIActionsTypes> {
    type: UIActionsTypes.uiStartLoading;
}

export interface IUIFinishLoadinAction extends IBasicAction<UIActionsTypes> {
    type: UIActionsTypes.uiFinishLoading;
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
        case UIActionsTypes.uiStartLoading:
            return {
                ...state,
                loading: true,
            };

        case UIActionsTypes.uiFinishLoading:
            return {
                ...state,
                loading: false,
            };

        default:
            return {
                ...state,
            };
    }
};
