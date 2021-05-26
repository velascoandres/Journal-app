import React from 'react'

export const JournalEntry: React.FC = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={
                    {
                        WebkitBackgroundSize: 'cover',
                        backgroundImage: 'url(https://guimsa.com/img/demopage/image-3.jpg)'
                    }
                }    
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día
                </p>
                <p className="journal__entry-content">
                    Proident ipsum magna labore culpa exercitation mollit laboris Lorem id adipisicing sunt consectetur occaecat.
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    );
}
