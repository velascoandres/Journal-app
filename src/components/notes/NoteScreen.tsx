import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useAppSelector } from '../../hooks/selectors';
import { useForm } from '../../hooks/userForm';
import { INote, NotesState } from '../../reducers/notesReducer';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen: React.FC = () => {

    const { active: note } = useAppSelector<NotesState>(state => state.notes);

    const dispatch = useDispatch();

    const [formValues, handleInputChanges, reset] = useForm<INote>(
        note as INote,
    );

    const { title, body } = formValues;


    const activeId = useRef(note?.id);


    useEffect(() => {
        if (note && note.id !== activeId.current) {
            reset(note);
            // para evitar el ciclo infinito
            activeId.current = note.id;
        }
    }, [note, reset]);


    useEffect(() => {
        if (formValues) {
        }
        dispatch(activeNote(formValues.id as string, { ...formValues }));

    }, [formValues, dispatch]);


    const handleDelete = () => {
        dispatch(startDeleting(note?.id as string));
    };

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    onChange={handleInputChanges}
                />

                <textarea
                    name="body"
                    id="body"
                    placeholder="What happened today"
                    value={body}
                    className="notes__textarea"
                    onChange={handleInputChanges}
                >
                </textarea>

                {
                    note?.imageUrl &&

                    <div className="notes__image">
                        <img src={note?.imageUrl} alt="COVER" />
                    </div>
                }

            </div>

            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
}
