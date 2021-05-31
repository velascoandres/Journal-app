import { ISetNotesAction } from './../reducers/notesReducer';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { INote, ISelectNoteAction, NotesActionTypes } from '../reducers/notesReducer';
import { RootState } from '../store/store';

import { db } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';


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



export const setNotes = (notes: INote[]): ISetNotesAction => (
    {
        type: NotesActionTypes.loadNotes,
        payload: notes,
    }
);


export const startLoadNotes = (): ThunkAction<void, RootState, unknown, ISetNotesAction> => {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const { uid } = getState().auth;

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    };
}
