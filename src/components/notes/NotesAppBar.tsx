import React from 'react';
import { useDispatch } from 'react-redux';
import { startSaveNote } from '../../actions/notes';
import { useAppSelector } from '../../hooks/selectors';
import { INote, NotesState } from '../../reducers/notesReducer';

import moment from 'moment';

export const NotesAppBar: React.FC = () => {

    const dispatch = useDispatch();

    const { active: note } = useAppSelector<NotesState>(state => state.notes);

    const handleSave = () => {

        dispatch(startSaveNote(note as INote));

    };


    return (
        <div className="notes__appbar">
            <span>{moment(new Date()).format('LL')}</span>

            <div>
                <button
                    className="btn"
                >
                    Picture
                </button>
                <button
                    onClick={handleSave}
                    className="btn"
                >
                    Save
                </button>
            </div>

        </div>
    );
}
