import { finishLoading, removeError, setError, startLoading } from "../../actions/ui";
import { IUIFinishLoadinAction, IUIRemoveErrorAction, IUISetErrorAction, IUIStartLoadinAction, UIActionsTypes } from "../../reducers/uiReducer"

describe('Pruebas en ui-actions', () => {
    
    test('Todas las acciones deben de funcionar', () => {
        
        const setErrorAction: IUISetErrorAction = {
            type: UIActionsTypes.uiSetError,
            payload: 'Error generico',
        };


        const removeErrorAction: IUIRemoveErrorAction = {
            type: UIActionsTypes.uiRemoveError,
        };

        // IUIStartLoadinAction // IUIFinishLoadinAction

        const startLoadingAction: IUIStartLoadinAction = {
            type: UIActionsTypes.uiStartLoading,
        };

        const finishLoadingAction: IUIFinishLoadinAction = {
            type: UIActionsTypes.uiFinishLoading,
        };

       const setErrorActionToTest = setError('Error generico');
       const removeErrorActionToTest = removeError();
       const startLoadingActionToTest = startLoading();
       const finishLoadingActionToTest = finishLoading();

       expect(setErrorActionToTest).toEqual(setErrorAction);
       expect(removeErrorActionToTest).toEqual(removeErrorAction);
       expect(startLoadingActionToTest).toEqual(startLoadingAction);
       expect(finishLoadingActionToTest).toEqual(finishLoadingAction);

    });
    

})
