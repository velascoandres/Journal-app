import { IAuthRegisterAction } from './authReducer';
import { Reducer } from 'react';
import { IBasicAction } from './interfaces/basic-action.interface';
export interface INote {
    id: string;
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
    select = '[Notes] Select',
}


export interface ISelectNote extends IBasicAction<NotesActionTypes> {
    type: NotesActionTypes.select,
}



export const notesReducer: Reducer<NotesState, IBasicAction<NotesActionTypes>> = (state: NotesState = initialNoteState, action) => {

    return initialNoteState;


}