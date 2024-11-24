import Button from '@/components/button';
import StudyPlanCard from '@/components/cards/study-plan-card';
import useErrorHandler from '@/hooks/error-handler';
import studyPlanServices from '@/redux/services/study-plan/study-plan.service';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { Link, useParams } from 'react-router-dom';

interface Props {
    tier: number;
}

export default function TierStudyPlan({ tier }: Props) {
    const { classId } = useParams();

    const {
        data: studyPlans,
        isError: isStudyPlansError,
        error: studyPlansError,
        isLoading: isStudyPlansLoading
    } = studyPlanServices.useGetTierStudyPlansQuery(
        {
            classId,
            tier
        },
        {
            skip: !classId || !tier
        }
    );
    useErrorHandler(isStudyPlansError, studyPlansError);

    return (
        <Card className="rounded-md p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center gap-3 max-md:flex-col">
                <p className="text-xl text-dark-green">Current Study Plan</p>
                <Link to={`create/${tier}`}>
                    <Button>Add New Plan</Button>
                </Link>
            </div>
            <div className="flex flex-col">
                {isStudyPlansLoading ? (
                    <div className="flex justify-center items-center min-h-28">
                        <Spinner />
                    </div>
                ) : studyPlans?.data?.length === 0 ? (
                    <div className="flex flex-col gap-3 justify-center items-center p-5 mt-5">
                        <img src="/images/empty.svg" className="max-w-40" alt="Empty" />
                        <p>No Study Plans yet</p>
                    </div>
                ) : (
                    <CardBody className="grid grid-cols-3 gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1">
                        {studyPlans.data.map(
                            (card: { id: number; name: string; description: string }) => (
                                <StudyPlanCard
                                    key={card.id}
                                    id={card.id}
                                    description={card.description}
                                    planName={card.name}
                                />
                            )
                        )}
                    </CardBody>
                )}
            </div>
        </Card>
    );
}
