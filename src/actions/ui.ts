import { ActionFactory } from "../reducers/interfaces/action-factory.type";
import { IUISetErrorAction, IUIRemoveErrorAction, UIActionsTypes, IUIStartLoadinAction, IUIFinishLoadinAction } from "../reducers/uiReducer";

export const setError: ActionFactory<IUISetErrorAction> = (error: string) => ({
    type: UIActionsTypes.uiSetError,
    payload: error,
});


export const removeError: ActionFactory<IUIRemoveErrorAction> = () => ({
    type: UIActionsTypes.uiRemoveError,
});


export const startLoading: ActionFactory<IUIStartLoadinAction> = () => (
    {
        type: UIActionsTypes.uiStartLoading
    }
);

export const finishLoading: ActionFactory<IUIFinishLoadinAction> = () => (
    {
        type: UIActionsTypes.uiFinishLoading
    }
);
