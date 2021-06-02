import { Reducer } from 'react';
import { IBasicAction } from './interfaces/basic-action.interface';
export interface INote {
    id?: string;
    title: string;
    body: string;
    imageUrl?: string;
    date?: number;
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

export interface IUpdateNoteAction extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.updateNote;
    payload: {
        id: string;
        note: INote;
    };
}

export interface ICreateNoteAction extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.addNewNote;
    payload: INote;
}

export interface IDeleteNoteAction extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.deleteNote;
    payload: { id: string };
}


export interface ICleanNotesAction extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.cleanNotes;
}



export const notesReducer: Reducer<NotesState, IBasicAction<NotesActionTypes>> = (state: NotesState = initialNoteState, action: IBasicAction<NotesActionTypes>): NotesState => {

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

        case NotesActionTypes.addNewNote:
            return {
                ...state,
                notes: [
                    action.payload as INote,
                    ...state.notes,
                ],
            };

        case NotesActionTypes.updateNote:

            const { notes } = state;
            const { id, note } = (action as IUpdateNoteAction).payload;

            const updatedNotes = notes.map(
                (currentNote: INote) => {
                    return currentNote.id === id ? note : currentNote;
                },
            );

            return {
                ...state,
                notes: updatedNotes,
            };

        case NotesActionTypes.deleteNote:
            return {
                ...state,
                active: null,
                notes: state
                    .notes
                    .filter(
                        (note) => note.id !== action.payload.id,
                    ),
            };
        
        case NotesActionTypes.cleanNotes:
            return {
                ...initialNoteState,
            };

        default:
            break;
    };
    return {
        ...state,
    };

}