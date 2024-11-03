import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

interface StudyPlanProps {
    planName: string;
    authorName: string;
}

const StudyPlanCard: React.FC<StudyPlanProps> = ({ planName, authorName }) => {
    return (
        <div className="w-full h-auto max-w-md p-4 bg-white shadow-custom rounded-xl drop-shadow-sm">
            <div className="pl-2 text-2xl font-semibold">{planName}</div>
            <div className="pb-6 pl-2 text-xl font-medium">{authorName}</div>
            <Button className="rounded-md">View</Button>

            <img
                className="absolute bottom-0 right-2"
                src="/images/subjects/plan.svg"
                alt="Study Plan"
            />
        </div>
    );
};

StudyPlanCard.propTypes = {
    planName: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired
};

export default StudyPlanCard;
