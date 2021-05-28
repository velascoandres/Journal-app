import { ActionFactory } from "../reducers/interfaces/action-factory.type";
import { IUISetErrorAction, IUIRemoveErrorAction, UIActionsTypes } from "../reducers/uiReducer";

export const setError: ActionFactory<IUISetErrorAction> = (error: string) => ({
    type: UIActionsTypes.uiSetError,
    payload: error,
});


export const removeError: ActionFactory<IUIRemoveErrorAction> = () => ({
    type: UIActionsTypes.uiRemoveError,
});

