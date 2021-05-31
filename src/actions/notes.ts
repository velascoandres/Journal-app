import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { INote, ISelectNoteAction, NotesActionTypes } from '../reducers/notesReducer';
import { RootState } from '../store/store';

import { db } from '../firebase/firebase-config';


export const startNewNote = (): ThunkAction<void, RootState, unknown, any> => {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        } as INote;

        const documentRef = await db.collection(
            `${uid}/journal/notes`
        ).add(newNote);

        dispatch(
            activeNote(documentRef.id, newNote),
        );


    };
};

export const activeNote = (id: string, note: INote): ISelectNoteAction => (
    {
        type: NotesActionTypes.setActiveNote,
        payload: {
            id,
            ...note,
        }
    }
)
