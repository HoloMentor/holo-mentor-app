import React from 'react';
import PropTypes from 'prop-types';

interface StudyPlanProps {
    planName: string;
    autherName: string;
}

const StudyPlanCard: React.FC<StudyPlanProps> = ({ planName, autherName }) => {
    return (
        <section className='w-full h-full max-w-md max-h-32 p-4 rounded-md shadow-lg bg-slate-500 drop-shadow-lg'>
            <div>{planName}</div>
            <div>{autherName}</div>
        </section>
    );
};

StudyPlanCard.propTypes = {
    planName:PropTypes.string.isRequired,
    autherName:PropTypes.string.isRequired
};

export default StudyPlanCard;
