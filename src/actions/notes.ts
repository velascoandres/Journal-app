import { Dispatch } from 'react';

import { ThunkAction } from 'redux-thunk';
import Swal from 'sweetalert2';

import { ICreateNoteAction, ISetNotesAction, IUpdateNoteAction } from './../reducers/notesReducer';
import { INote, ISelectNoteAction, NotesActionTypes } from '../reducers/notesReducer';
import { RootState } from '../store/store';
import { fileUpload } from './../helpers/fileUpload';
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


        dispatch(
            createNote(documentRef.id, newNote),
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


export const startSaveNote = (note: INote) => {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {

        const { uid } = getState().auth;

        if (!note.imageUrl) {
            delete note.imageUrl;
        }

        const noteToFirestore = { ...note };

        delete noteToFirestore.id;

        await db
            .doc(`${uid}/journal/notes/${note.id}`)
            .update(noteToFirestore);

        dispatch(refreshNote(note.id as string, note));

        Swal.fire('Saved', note.title, 'success');

    };
}


export const refreshNote = (id: string, note: INote): IUpdateNoteAction => (
    {
        type: NotesActionTypes.updateNote,
        payload: {
            id,
            note,
        },
    }
);

export const createNote = (id: string, note: INote): ICreateNoteAction => (
    {
        type: NotesActionTypes.addNewNote,
        payload: {
            id,
            ...note,
        },
    }
);


export const startUploading = (file: File) => {
    return async (dispatch: Dispatch<any>, getState: () => RootState) => {
        const { active: note } = getState().notes;

        Swal.fire(
            {
                title: 'Uploading...',
                text: 'Please wait...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            }
        );

        const fileUrl = await fileUpload(file);

        if (fileUrl) {
            (note as INote).imageUrl = fileUrl;
            dispatch(startSaveNote(note));
            Swal.close();
        } else {
            Swal.close();
            Swal.fire('Error', 'Error al subir el archivo', 'error');
        }

    };
}