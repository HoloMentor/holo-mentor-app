import { useState } from 'react';
import StudyPlanCard from '@/components/cards/study-plan-card';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';

export default function StudyPlan() {
    const [toggleState, setToggleState] = useState<number>(1);
    const dispatch = useDispatch();

    const tiers = [
        {
            id: 1,
            content: [
                <StudyPlanCard planName="Plan for Tier 1" autherName="Amith Pussella" />,
                <StudyPlanCard planName="Plan for Tier 1B" autherName="Samitha Rathnayake" />
            ],
            tierDescription: 'Tier 01: Marks 80 - 100'
        },
        {
            id: 2,
            content: [
                <StudyPlanCard planName="Plan for Tier 2" autherName="Author 1" />,
                <StudyPlanCard planName="Plan for Tier 2" autherName="Author 1" />,
                <StudyPlanCard planName="Plan for Tier 2" autherName="Author 1" />
            ],
            tierDescription: 'Tier 02: Marks 60 - 80'
        },
        {
            id: 3,
            content: [<StudyPlanCard planName="Plan for Tier 3" autherName="Author 1" />],
            tierDescription: 'Tier 03: Marks 40 - 60'
        },
        {
            id: 4,
            content: [<StudyPlanCard planName="Plan for Tier 4" autherName="Author 1" />],
            tierDescription: 'Tier 04: Marks 20 - 40'
        },
        {
            id: 5,
            content: [<StudyPlanCard planName="Plan for Tier 5" autherName="Author 1" />],
            tierDescription: 'Tier 05: Marks 0 - 20'
        }
    ];

    const buttonClasses = (tier: number): string =>
        `p-4 rounded-t-lg shadow-lg flex  justify-between ${
            toggleState === tier ? 'bg-white' : 'bg-gray-200'
        } font-semibold text-xl`;

    return (
        <section className="h-screen mb-20">
            <div className="flex p-4 mr-4 bg-white rounded-md shadow-md">
                <p className="ml-3 text-3xl font-bold text-dark-green">Study Plan</p>
            </div>
            <section className="flex flex-col h-full mt-4">
                <div className="grid grid-cols-5 gap-2 mr-4 rounded-md shadow-custom">
                    {tiers.map((tier) => (
                        <button
                            key={tier.id}
                            className={buttonClasses(tier.id)}
                            onClick={() => setToggleState(tier.id)}>
                            <span className="hidden max-sm:inline">{tier.id}</span>
                            <span className=" max-sm:hidden">Tier {tier.id}</span>
                            {toggleState === tier.id && (
                                <Popover placement="right">
                                    <PopoverTrigger>
                                        <img src="/images/Information-circle.png" alt="Info" />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2">
                                            <div className="font-bold text-small">
                                                {tier.tierDescription}
                                            </div>
                                            <div className="text-tiny">
                                                Clusters are identified according <br />
                                                to the results of students
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex px-8 pt-8 pb-5 mr-4 bg-white place-content-between max-sm:flex-col max-sm:space-y-5">
                    <h1 className="pl-4 text-xl font-semibold text-dark-green">
                        Current Study Plan
                    </h1>
                    <Button
                        className="text-white bg-dark-green"
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.ADD_STUDY_PLAN
                                })
                            )
                        }>
                        Create New Plan
                    </Button>
                </div>
                {tiers.map(
                    (tier) =>
                        toggleState === tier.id && (
                            <div className="grid h-full grid-cols-2 mr-4 overflow-auto bg-white rounded-md min-h-96 max-sm:grid-cols-1">
                                <div key={tier.id} className="p-4 space-y-10">
                                    {tier.content.map(
                                        (contentItem, index) =>
                                            index % 2 == 0 && <div>{contentItem}</div>
                                    )}
                                </div>
                                <div key={tier.id} className="p-4 space-y-10 ">
                                    {tier.content.map(
                                        (contentItem, index) =>
                                            index % 2 == 1 && <div>{contentItem}</div>
                                    )}
                                </div>
                            </div>
                        )
                )}
            </section>
        </section>
    );
}
