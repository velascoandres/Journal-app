import React from 'react'
import { useAppSelector } from '../../hooks/selectors';
import { INote, NotesState } from '../../reducers/notesReducer';
import { JournalEntry } from './JournalEntry';

export const JournalEntries: React.FC = () => {

    const { notes } = useAppSelector<NotesState>(state => state.notes);

    return (
        <div className="journal__entries">
            {
                notes.map(
                    (note: INote, index: number) => (
                        <JournalEntry
                            key={note.id || index}
                            {...note}
                        />
                    )
                )

            }
        </div>
    )
}
