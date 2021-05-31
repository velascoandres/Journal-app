import { db } from '../firebase/firebase-config';
import { INote } from '../reducers/notesReducer';


export const loadNotes = async (uid: string): Promise<INote[]> => {
    const notesSnap = await db
        .collection(`${uid}/journal/notes`)
        .get();
    const notes: INote[] = [];

    notesSnap.forEach(
        noteSnap => {
            notes.push(
                {
                    id: noteSnap.id,
                    ...noteSnap.data() as INote,
                }
            )
        }
    );

    return notes;
};

