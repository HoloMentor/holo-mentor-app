import StudyPlanCard from '@/components/cards/study-plan-card';
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react';
import Button from '@/components/button';
import { useDispatch } from 'react-redux';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';

export default function StudyPlan() {
    const dispatch = useDispatch();
    const tiers = [
        {
            id: 1,
            label: 'Tier 1',
            content: [
                <StudyPlanCard planName="Plan for Tier 1" authorName="Amith Pussella" />,
                <StudyPlanCard planName="Plan for Tier 1B" authorName="Amith Pussella" />
            ],
            tierDescription: 'Tier 01: Marks 80 - 100'
        },
        {
            id: 2,
            label: 'Tier 2',
            content: [
                <StudyPlanCard planName="Plan for Tier 2" authorName="Author 1" />,
                <StudyPlanCard planName="Plan for Tier 2" authorName="Author 1" />,
                <StudyPlanCard planName="Plan for Tier 2" authorName="Author 1" />
            ],
            tierDescription: 'Tier 02: Marks 60 - 80'
        },
        {
            id: 3,
            label: 'Tier 3',
            content: [<StudyPlanCard planName="Plan for Tier 3" authorName="Author 1" />],
            tierDescription: 'Tier 03: Marks 40 - 60'
        },
        {
            id: 4,
            label: 'Tier 4',
            content: [<StudyPlanCard planName="Plan for Tier 4" authorName="Author 1" />],
            tierDescription: 'Tier 04: Marks 20 - 40'
        },
        {
            id: 5,
            label: 'Tier 5',
            content: [<StudyPlanCard planName="Plan for Tier 5" authorName="Author 1" />],
            tierDescription: 'Tier 05: Marks 0 - 20'
        }
    ];

    return (
        <section className="h-screen mb-20">
            <div className="flex p-4 mr-4 bg-white rounded-md shadow-md">
                <p className="ml-3 text-3xl font-bold text-dark-green">Study Plan</p>
            </div>
            <section className="my-5 mr-2">
                <div className="flex flex-col w-full">
                    <Tabs aria-label="Dynamic tabs" items={tiers}>
                        {(item) => (
                            <Tab
                                key={item.id}
                                title={item.label}
                                className="py-5 font-semibold text-medium">
                                <Card className="rounded-md p-4 flex flex-col gap-3">
                                    <div className="flex justify-between items-center gap-3 max-md:flex-col">
                                        <p className="text-xl text-dark-green">
                                            Current Study Plan
                                        </p>
                                        <Button
                                            onClick={() =>
                                                dispatch(
                                                    modelActions.show({
                                                        name: modelNames.ADD_STUDY_PLAN
                                                    })
                                                )
                                            }>
                                            Add New Plan
                                        </Button>
                                    </div>
                                    <div className="flex flex-col">
                                        <CardBody className="grid grid-cols-3 gap-4 max-2xl:grid-cols-2 max-lg:grid-cols-1">
                                            {item.content.map((card, index) => (
                                                <div key={index} className="w-full">
                                                    {card}
                                                </div>
                                            ))}
                                        </CardBody>
                                    </div>
                                </Card>
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </section>
        </section>
    );
}
