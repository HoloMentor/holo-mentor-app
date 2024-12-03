import Checkbox from '@/components/checkbox';
import Select, { SelectValue } from '@/components/select';
import useErrorHandler from '@/hooks/error-handler';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import classSubTopicServices from '@/redux/services/class/subtopics.service';
import classTopicServices from '@/redux/services/class/topics.service';
import { Tooltip } from '@nextui-org/react';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

export interface SubTopicProps {
    id: string;
    name: string;
    isDone: boolean;
    materials: TopicMaterials[];
    hideOptions?: boolean;
}

export interface TopicMaterials {
    id: string;
    name: string;
    topicId: string;
    subTopicId: string;
    type: 'URL' | 'VIDEO' | 'FILE' | 'PDF' | 'OTHER';
    url: string;
}

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

export default function SubTopic({ data, hideOptions = false }: { data: SubTopicProps, hideOptions?: boolean }) {
    const dispatch = useDispatch();
    const [filterState, setFilterState] = React.useState<SelectValue>('all');
    const materialData = useMemo(
        () =>
            filterState === 'all'
                ? data.materials
                : data.materials.filter((_) => _.type === filterState),
        [filterState, data.materials]
    );

    // update sub topic done state
    const [updateDoneState, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] =
        classSubTopicServices.useUpdateDoneStateMutation();
    useErrorHandler(isUpdateError, updateError);

    const extractFileName = useCallback(
        (url: string) => {
            if (!url) return '-';

            const result = url.split('/');
            return result[result.length - 1];
        },
        [data.materials]
    );

    const setIsDone = async (value: Boolean) => {
        const result = await updateDoneState({
            id: data.id,
            isDone: value
        });

        if (result.data.status === 200) {
            dispatch(classTopicServices.util.invalidateTags(['ClassTopics']));
        }
    };
    console.log(data);
    console.log(hideOptions);
    return (
        <div className="flex flex-col gap-5 p-3">
            <div className="flex items-center justify-between gap-3">
                <div className={`flex items-center gap-2`}>
                    <div className={hideOptions ? 'hidden' : ''}>
                        <Checkbox
                            className={hideOptions ? 'hidden' : ''}
                            isDisabled={isUpdating}
                            isSelected={data.isDone}
                            onValueChange={setIsDone}>
                            <Tooltip
                                color="primary"
                                placement="top-start"
                                showArrow
                                content="Mark as done">
                                <span className="font-semibold">{data.name}</span>
                            </Tooltip>
                        </Checkbox>
                    <Tooltip
                        style={{
                            zIndex: '1'
                        }}
                        placement="right-start"
                        content={
                            <div className="flex flex-col gap-3">
                                <div
                                    onClick={() => {
                                        dispatch(
                                            modelActions.show({
                                                name: modelNames.EDIT_SUBTOPIC,
                                                props: {
                                                    topicId: data.id,
                                                    name: data.name
                                                }
                                            })
                                        );
                                    }}
                                    className="flex gap-2 py-1 px-2 cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                    <span>Edit</span>
                                </div>
                                <div
                                    onClick={() => {
                                        dispatch(
                                            modelActions.show({
                                                name: modelNames.DELETE_SUBTOPIC,
                                                props: {
                                                    id: data.id
                                                }
                                            })
                                        );
                                    }}
                                    className="flex gap-2 py-1 px-2 cursor-pointer">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-5 text-danger">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-danger">Delete</span>
                                </div>
                            </div>
                        }
                        className="relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 cursor-pointer">
                            <path
                                fillRule="evenodd"
                                d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Tooltip>
                    </div>
                </div>
                <div className="w-40">
                    <Select
                        value={filterState}
                        onChange={setFilterState}
                        placeholder=""
                        options={filterOptions}
                    />
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4 gap-y-10 max-2xl:grid-cols-4 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
                {!materialData ||
                materialData.length === 0 ||
                materialData.every((m) => !m.id && !m.url && !m.type) ? (
                    <p>No materials found.</p>
                ) : (
                    materialData
                        .filter(
                            (material) =>
                                material.id !== null &&
                                material.url !== null &&
                                material.type !== null
                        )
                        .map((material, j) => {
                            return (
                                <div key={`material-${j}`} className="flex flex-col items-center">
                                    <span
                                        onClick={() =>
                                            material.id &&
                                            dispatch(
                                                modelActions.show({
                                                    name: modelNames.DELETE_MATERIAL,
                                                    props: { id: material.id }
                                                })
                                            )
                                        }
                                        className={`flex justify-end cursor-pointer max-w-24 w-full ${hideOptions ? 'hidden' : ''}`}>
                                        <svg
                                            width="15"
                                            height="15"
                                            viewBox="0 0 15 15"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_131_12585)">
                                                <rect
                                                    width="15"
                                                    height="15"
                                                    rx="7.5"
                                                    fill="#FF0E00"
                                                />
                                                <path
                                                    d="M10.5524 6.76V8.53H4.19244V6.76H10.5524Z"
                                                    fill="black"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_131_12585">
                                                    <rect
                                                        width="15"
                                                        height="15"
                                                        rx="7.5"
                                                        fill="white"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </span>
                                    <a
                                        title={'Subject Name'}
                                        key={`material-${material.id}`}
                                        href={material.url}
                                        className="flex flex-col items-center gap-2 text-dark-gray">
                                        <img
                                            src={`/images/subjects/${material.type.toLowerCase()}.svg`}
                                            alt="PDF Material"
                                            className="size-20"
                                        />
                                        <span className="block">
                                            {material.name || extractFileName(material.url)}
                                        </span>
                                    </a>
                                </div>
                            );
                        })
                )}
            </div>
        </div>
    );
}
