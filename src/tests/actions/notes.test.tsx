import configureStore from 'redux-mock-store' //ES6 modules
import { startNewNote } from '../../actions/notes';
import { NotesActionTypes } from '../../reducers/notesReducer';

import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
    auth: {
        uid: 'TESTING',
    },
    notes: {
        active: null,
        notes: [],
    },
});


describe('Pruebas con las acciones de notes', () => {
    test('debe de crear una nueva nota "startNewNote"', async () => {


        await store.dispatch<any>(startNewNote());

        const actions = store.getActions();


        expect(actions[0]).toEqual(
            {
                type: NotesActionTypes.setActiveNote,
                payload: {
                    id: expect.any(String),
                    date: expect.any(Number),
                    title: '',
                    body: ''
                },
            },
        );


        expect(actions[1]).toEqual(
            {
                type: NotesActionTypes.addNewNote,
                payload: {
                    id: expect.any(String),
                    date: expect.any(Number),
                    title: '',
                    body: ''
                },
            },
        );

        

    });

})
