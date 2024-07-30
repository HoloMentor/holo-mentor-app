import Select, { SelectValue } from '@/components/select';
import React from 'react';

export default function SubTopic() {
    const [filterState, setFilterState] = React.useState<SelectValue>('all');

    const filterOptions = [
        {
            label: 'All',
            value: 'all'
        },
        {
            label: 'Video',
            value: 'video'
        },
        {
            label: 'PDF',
            value: 'pdf'
        }
    ];

    return (
        <div className="flex flex-col gap-5 p-3">
            <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">1.1 Measurement</p>
                <div className="w-40">
                    <Select
                        value={filterState}
                        onChange={setFilterState}
                        placeholder=""
                        options={filterOptions}
                    />
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4 gap-y-10 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1">
                {Array.from({ length: 7 }).map((_, j) => {
                    return (
                        <a
                            title={'Subject Name'}
                            key={`subject-${j}`}
                            href={`/subjects/${j}`}
                            className="flex flex-col items-center gap-2 text-dark-gray">
                            <img
                                src="/images/subjects/doc.svg"
                                alt="PDF Material"
                                className="size-20"
                            />
                            <span className="block">Measurement 1.1 - SI</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
