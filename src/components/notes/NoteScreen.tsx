import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen: React.FC = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                />

                <textarea
                    name="content"
                    id="content"
                    placeholder="What happened today"
                    className="notes__textarea"
                >
                </textarea>

                <div className="notes__image">
                    <img src="https://ik.imagekit.io/ikmedia/backlit.jpg" alt="COVER" />
                </div>
            </div>
        </div>
    )
}
