import { IAuthRegisterAction } from './authReducer';
import { Reducer } from 'react';
import { IBasicAction } from './interfaces/basic-action.interface';
export interface INote {
    id?: string;
    title: string;
    body: string;
    imageUrl: string;
    date: number;
}


export type NotesState = {
    notes: INote[];
    active: INote | null;
}

const initialNoteState: NotesState = {
    notes: [],
    active: null,
};

export enum NotesActionTypes {
    setActiveNote = '[Notes] Set Active Note',
    addNewNote = '[Notes] Add new note',
    loadNotes = '[Notes] load notes',
    updateNote = '[Notes] update note',
    deleteNote = '[Notes] delete note',
    cleanNotes = '[Notes] Clean notes logout',
}


export interface ISelectNoteAction extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.setActiveNote;
    payload: INote;
}

export interface ISetNotesAction extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.loadNotes;
    payload: INote[];
}



export const notesReducer: Reducer<NotesState, IBasicAction<NotesActionTypes>> = (state: NotesState = initialNoteState, action) => {

    switch (action.type) {
        case NotesActionTypes.setActiveNote:
            return {
                ...state,
                active: {
                    ...action.payload,
                },
            };

        case NotesActionTypes.loadNotes:
            return {
                ...state,
                notes: action.payload,
            };
        default:
            return {
                ...initialNoteState,
            }
    };

}