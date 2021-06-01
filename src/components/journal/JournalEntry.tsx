import React from 'react'
import { INote } from '../../reducers/notesReducer';
import moment from 'moment';


export const JournalEntry: React.FC<INote> = ({ title, body, date, imageUrl }: INote) => {


    const defaultUrl = 'https://guimsa.com/img/demopage/image-3.jpg';

    const noteDate = moment(date);

    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style={
                    {
                        WebkitBackgroundSize: 'cover',
                        backgroundImage: `url(${imageUrl || defaultUrl})`,
                    }
                }
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    );
}
