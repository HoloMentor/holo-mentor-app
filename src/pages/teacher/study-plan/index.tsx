import Button from '@/components/button';
import StudyPlanCard from '@/components/cards/study-plan-card';
import Content from '@/components/content';
import Heading from '@/components/headings/main';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { useDispatch } from 'react-redux';

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
        <section className="flex flex-col gap-3">
            <Heading>Study Plans</Heading>

            <Content>
                <p>
                    Please download the sample CSV file by clicking on <b>Download Sample CSV</b>{' '}
                    and fill in the student marks. Once you’ve completed the file, upload it using
                    the <b>Upload Marks</b> button. Based on the grades, students will be
                    automatically sorted into different tiers, with Tier 1 for A-grade students,
                    Tier 2 for B-grade students, and so on.
                </p>
                <div className="flex gap-3 items-center">
                    <Button
                        variant="bordered"
                        className="border-2 text-dark-green border-dark-green"
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_MARKS
                                })
                            )
                        }>
                        Download Sample CSV
                    </Button>

                    <Button
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_MARKS
                                })
                            )
                        }>
                        Upload Marks
                    </Button>
                </div>
            </Content>

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
