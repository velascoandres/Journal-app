import React from 'react';
import { useSelector } from 'react-redux';
import { NotesState } from '../../reducers/notesReducer';
import { IStore } from '../../store/store';
import { NoteScreen } from '../notes/NoteScreen';
import { NothingSelected } from './NothingSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen: React.FC = () => {

    const { active, notes } = useSelector<IStore, NotesState>(state => state.notes);



    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {
                    active ?
                        <NoteScreen />
                        :
                        <NothingSelected />

                }
            </main>
        </div>
    );
};
