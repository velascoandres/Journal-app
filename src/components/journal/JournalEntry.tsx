import React, { useMemo } from 'react'
import { INote } from '../../reducers/notesReducer';
import moment from 'moment';
import { useAppDispatch } from '../../hooks/selectors';
import { activeNote } from '../../actions/notes';


export const JournalEntry: React.FC<INote> = ({ id, title, body, date, imageUrl }: INote) => {


    const noteDate = moment(date);

    const dispatch = useAppDispatch();


    const handleSelect = () => {
        dispatch(activeNote(id as string, { title, body, date: date ?? 0, imageUrl: imageUrl ?? '' }));
    };

    const limitBody = (body: string): string => {
        const limit = 100;
        const isLimit = body.split('').length >= limit;
        if (isLimit) {
            return body.substring(0, limit - 5).trim() + '.....';
        }
        return body;
    };

    const limitedBody = useMemo(
        () => limitBody(body), [body]
    );

    return (
        <div
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
            onClick={handleSelect}
        >
            {
                imageUrl &&
                <div
                    className="journal__entry-picture"
                    style={
                        {
                            WebkitBackgroundSize: 'cover',
                            backgroundImage: `url(${imageUrl})`,
                        }
                    }
                >
                </div>
            }


            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {limitedBody}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    );
}
