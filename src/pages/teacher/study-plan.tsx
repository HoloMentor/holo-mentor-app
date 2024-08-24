import { useState } from 'react';
import StudyPlanCard from '@/components/cards/study-plan-card';
import { Button, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import { Tabs, Tab, Card, CardBody, CardHeader } from '@nextui-org/react';

export default function StudyPlan() {
    const [toggleState, setToggleState] = useState<number>(1);
    const dispatch = useDispatch();

    let tabs = [
        {
          id: "photos",
          label: "Photos",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          id: "music",
          label: "Music",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
          id: "videos",
          label: "Videos",
          content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ];

    const tiers = [
        {
            id: 1,
            content: [
                <StudyPlanCard planName="Plan for Tier 1" autherName="Amith Pussella" />,
                <StudyPlanCard planName="Plan for Tier 1B" autherName="Amith Pussella" />
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
            <section className='my-3 mr-3'>
                <div className="flex flex-col w-full">
                    <Tabs aria-label="Dynamic tabs" items={tabs}>
                        {(item) => (
                            <Tab key={item.id} title={item.label}>
                                <Card className='py-4 rounded-md'>
                                    <CardBody >{item.content}</CardBody>
                                </Card>
                            </Tab>
                        )}
                    </Tabs>
                </div>
            </section>
        </section>
    );
}
