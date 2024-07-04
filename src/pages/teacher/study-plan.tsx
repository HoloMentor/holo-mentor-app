import React from 'react';
import { useState } from 'react';
import StudyPlanCard from '@/components/cards/study-plan-card';

export default function StudyPlan() {
    const [toggleState, setToggleState] = useState<number>(1);

    const tiers = [
        {
            id: 1,
            content: [
                <StudyPlanCard planName="Plan for Tier 1" autherName="Author 1" />,
                <StudyPlanCard planName="Plan for Tier 1B" autherName="Author 1" />
            ]
        },
        {
            id: 2,
            content: [<StudyPlanCard planName="Plan for Tier 2" autherName="Author 1" />,<StudyPlanCard planName="Plan for Tier 2" autherName="Author 1" />]
        },
        {
            id: 3,
            content: [<StudyPlanCard planName="Plan for Tier 3" autherName="Author 1" />]
        },
        {
            id: 4,
            content: [<StudyPlanCard planName="Plan for Tier 4" autherName="Author 1" />]
        },
        {
            id: 5,
            content: [<StudyPlanCard planName="Plan for Tier 5" autherName="Author 1" />]
        }
    ];

    const buttonClasses = (tier: number): string =>
        `p-4 rounded-t-lg shadow-lg ${
            toggleState === tier ? 'bg-white' : 'bg-gray-200'
        } font-semibold text-2xl`;

    return (
        <section className="h-screen mb-20">
            <div className="flex p-4 mr-4 bg-white rounded-md shadow-md">
                <p className="ml-3 text-3xl font-bold text-dark-green">Study Plan</p>
            </div>
            <section className="flex flex-col h-full mt-4">
                <div className="grid grid-cols-5 gap-2 mr-4 rounded-md shadow-md">
                    {tiers.map((tier) => (
                        <button
                            key={tier.id}
                            className={buttonClasses(tier.id)}
                            onClick={() => setToggleState(tier.id)}>
                            Tier {tier.id}
                        </button>
                    ))}
                </div>
                {tiers.map((tier) =>
                        toggleState === tier.id && (
                            <div className="grid h-full grid-cols-2 mr-4 bg-white">
                                <div key={tier.id} className="flex p-4">
                                    {tier.content[0]}
                                    {tier.content[2]}
                                </div>
                                <div key={tier.id} className="flex p-4">
                                    {tier.content[1]}
                                </div>
                            </div>
                        )
                )}
            </section>
        </section>
    );
}
