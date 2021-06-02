import React from 'react';
import { useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import { useAppSelector } from '../../hooks/selectors';
import { INote, NotesState } from '../../reducers/notesReducer';

import moment from 'moment';
import { fireEvent } from '@testing-library/react';

export const NotesAppBar: React.FC = () => {

    const dispatch = useDispatch();

    const { active: note } = useAppSelector<NotesState>(state => state.notes);

    const handlePictureClick = () => {
        const input = document.querySelector('#fileSelector');
        fireEvent.click(input as Element);
    };

    const handleSave = () => {

        dispatch(startSaveNote(note as INote));

    };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = (e?.target?.files || [])[0];
        if (file){
            dispatch(startUploading(file));
        }
    
    }


    return (
        <div className="notes__appbar">
            <span>{moment(new Date()).format('LL')}</span>

            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            <div>
                <button
                    className="btn"
                    onClick={handlePictureClick}
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
