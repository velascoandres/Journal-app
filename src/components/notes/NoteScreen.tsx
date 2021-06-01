import React, { useEffect, useRef } from 'react'
import { activeNote } from '../../actions/notes';
import { useAppDispatch, useAppSelector } from '../../hooks/selectors';
import { useForm } from '../../hooks/userForm';
import { INote, NotesState } from '../../reducers/notesReducer';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen: React.FC = () => {

    const { active: note } = useAppSelector<NotesState>(state => state.notes);

    const dispatch = useAppDispatch();

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
                        <img src="https://ik.imagekit.io/ikmedia/backlit.jpg" alt="COVER" />
                    </div>
                }

            </div>
        </div>
    );
}
