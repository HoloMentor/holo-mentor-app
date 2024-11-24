import { Link } from 'react-router-dom';
import Button from '../button';

interface StudyPlanProps {
    id: number;
    planName: string;
    authorName?: string;
    description?: string;
}

const StudyPlanCard = ({ id, planName, authorName, description }: StudyPlanProps) => {
    return (
        <div className="w-full h-auto max-w-md p-4 bg-white shadow-custom rounded-xl drop-shadow-sm">
            <div className="pl-2 text-2xl font-semibold">{planName}</div>
            {authorName && <div className="pb-6 pl-2 text-xl font-medium">{authorName}</div>}
            {description && <div className="pb-6 pl-2 text-sm font-normal">{description}</div>}

            <img
                className="absolute bottom-0 right-2"
                src="/images/subjects/plan.svg"
                alt="Study Plan"
            />

            <Link to={`view/${id}`}>
                <Button className="rounded-md">View</Button>
            </Link>
        </div>
    );
};

export default StudyPlanCard;
