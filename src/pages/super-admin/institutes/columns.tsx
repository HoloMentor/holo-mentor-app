import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from '@nextui-org/react';
import { useDispatch } from 'react-redux';

export function renderInstituteName({ data }: CustomTableCellData) {
    return (
        <div className="flex flex-raw">
            <Avatar
                showFallback
                fallback={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-default-500 size-6">
                        <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                }
                src={data?.instituteImage}
                alt="avatar"
                isBordered
                className="relative size-8 !rounded-full object-cover object-center"
            />
            <span className="mt-2 ml-5 text-left">{data?.instituteName}</span>
        </div>
    );
}

export function renderMoreActions({ data }: CustomTableCellData) {
    const dispatch = useDispatch();

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly className="rounded-full !size-7 !min-w-7">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-5">
                        <path
                            fillRule="evenodd"
                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownSection showDivider>
                    <DropdownItem
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.EDIT_INSTITUTE,
                                    props: { data }
                                })
                            )
                        }
                        endContent={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        }
                        className="text-black"
                        key="edit">
                        Edit
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection>
                    <DropdownItem
                        onClick={() =>
                            dispatch(
                                modelActions.show({
                                    name: modelNames.DELETE_INSTITUTE,
                                    props: { id: data.id }
                                })
                            )
                        }
                        endContent={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        }
                        className="text-danger"
                        key="delete">
                        Delete
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
