import Heading from '@/components/headings/main';
import Content from '@/components/content';
import {
    Button as NextUIButton,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger
} from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';

export default function QuizInfo() {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-3">
            <Heading>Quiz</Heading>

            <Content className="py-20 my-4 shadow-lg max-md:px-6">
                <div className="w-4/5 max-w-5xl mx-auto flex flex-col gap-8 max-md:w-full max-md:text-sm">
                    <h3 className="text-center text-dark-green font-bold text-3xl">Measurement</h3>
                    <p>
                        Torem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                        molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                        accumsan, Torem ipsum dolor sit amet,
                    </p>
                    <div className="!shadow-none p-10">
                        <div className="flex flex-col gap-10 pb-4">
                            {Array.from({ length: 10 }).map((_, qIndex) => (
                                <div
                                    key={qIndex}
                                    className="flex flex-col gap-6 border border-light-border rounded-lg p-10">
                                    <div>
                                        <div className="flex flex-row justify-between items-center">
                                            <span className="font-semibold items-center">
                                                Q No : {qIndex + 1}
                                            </span>
                                            <div className="flex">
                                                <Dropdown>
                                                    <DropdownTrigger>
                                                        <NextUIButton
                                                            isIconOnly
                                                            className="rounded-full !size-7 !min-w-7 bg-[white]">
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
                                                        </NextUIButton>
                                                    </DropdownTrigger>
                                                    <DropdownMenu>
                                                        <DropdownSection showDivider>
                                                            <DropdownItem
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
                                                                onClick={() =>
                                                                    dispatch(
                                                                        modelActions.show({
                                                                            name: modelNames.EDIT_MCQ
                                                                        })
                                                                    )
                                                                }
                                                                key="edit">
                                                                Edit
                                                            </DropdownItem>
                                                        </DropdownSection>
                                                        <DropdownSection>
                                                            <DropdownItem
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
                                            </div>
                                        </div>
                                    </div>
                                    <p className="pl-4">
                                        Torem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                                        dignissim, metus nec fringilla accumsan, Torem ipsum dolor
                                        sit amet, consectetur adipiscing elit. Etiam eu turpis
                                        molestie, dictum est a, mattis tellus. Sed dignissim, metus
                                        nec fringilla accumsan, Torem ipsum dolor sit amet,
                                        consectetur adipiscing elit.
                                    </p>
                                    <div className="flex flex-col pl-8 gap-2">
                                        <div className="flex items-center gap-2">
                                            <input
                                                className="text-lime-600"
                                                type="radio"
                                                name={`q${qIndex}`}
                                                id={`q${qIndex}a`}
                                                disabled
                                                checked
                                            />
                                            <label
                                                className="text-lime-600"
                                                htmlFor={`q${qIndex}a`}>
                                                Torem ipsum dolor sit amet, consectetur
                                            </label>
                                        </div>
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name={`q${qIndex}`}
                                                    id={`q${qIndex}b-${i}`}
                                                    disabled
                                                />
                                                <label htmlFor={`q${qIndex}b-${i}`}>
                                                    Torem ipsum dolor sit amet, consectetur
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Content>
        </div>
    );
}
