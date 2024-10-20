import Select, { SelectValue } from '@/components/select';
import React, { useCallback, useMemo } from 'react';

export interface SubTopicProps {
    id: string;
    name: string;
    materials: TopicMaterials[];
}

export interface TopicMaterials {
    id: string;
    name: string;
    topicId: string;
    subTopicId: string;
    type: 'URL' | 'VIDEO' | 'FILE' | 'PDF' | 'OTHER';
    url: string;
}

export default function SubTopic({ data }: { data: SubTopicProps }) {
    const [filterState, setFilterState] = React.useState<SelectValue>('all');
    const materialData = useMemo(
        () =>
            filterState === 'all'
                ? data.materials
                : data.materials.filter((_) => _.type === filterState),
        [filterState, data.materials]
    );

    const filterOptions = [
        {
            label: 'All',
            value: 'all'
        },
        {
            label: 'URL',
            value: 'URL'
        },
        {
            label: 'Video',
            value: 'VIDEO'
        },
        {
            label: 'PDF',
            value: 'PDF'
        }
    ];

    const extractFileName = useCallback(
        (url: string) => {
            const result = url.split('/');
            return result[result.length - 1];
        },
        [data.materials]
    );

    return (
        <div className="flex flex-col gap-5 p-3">
            <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{data.name}</p>
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
                {materialData.length === 0 ? (
                    <p>No materials found.</p>
                ) : (
                    materialData.map((_, j) => {
                        return (
                            <a
                                title={'Subject Name'}
                                key={`material-${_.id}`}
                                href={`/subjects/${j}`}
                                className="flex flex-col items-center gap-2 text-dark-gray">
                                <img
                                    src="/images/subjects/doc.svg"
                                    alt="PDF Material"
                                    className="size-20"
                                />
                                <span className="block">{_.name || extractFileName(_.url)}</span>
                            </a>
                        );
                    })
                )}
            </div>
        </div>
    );
}
