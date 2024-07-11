import Button from '@/components/button';
import Heading from '@/components/headings/main';
import Input from '@/components/input';
import Select, { SelectValue } from '@/components/select';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const filterOptions = [
    {
        value: 'top',
        label: 'Top'
    }
];

export default function Forum() {
    const location = useLocation();
    const [filterValue, setFilterValue] = useState<SelectValue>('top');

    return (
        <div className="flex flex-col gap-3">
            <Heading>Forum</Heading>

            <section className="flex justify-between items-center gap-5 pr-5">
                <div className="w-full max-w-36">
                    <Select options={filterOptions} value={filterValue} onChange={setFilterValue} />
                </div>
                <div className="flex items-center gap-2">
                    <Input placeholder="Search" />

                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="flex items-center gap-2"
                                endContent={
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-6">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                }>
                                Add New
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem
                                className="text-center text-black"
                                key="new"
                                href={`${location.pathname}/mcq`}>
                                MCQ
                            </DropdownItem>
                            <DropdownItem
                                className="text-center text-black"
                                key="copy"
                                href={`${location.pathname}/essay`}>
                                Essay
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </section>

            <section className="flex flex-col gap-5 pr-5">
                {Array.from({ length: 5 }).map((_, i) => {
                    return (
                        <div key={i} className="flex gap-3 bg-white rounded-md p-6">
                            <div className="flex gap-2 items-center min-h-36">
                                <span className="font-semibold text-dark-gray">20</span>
                                <div className="flex flex-col gap-4">
                                    <button className="rounded-full p-1 transition-all duration-300 hover:bg-slate-100 active:bg-slate-200">
                                        <svg
                                            width="29"
                                            height="30"
                                            viewBox="0 0 29 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g id="Iconly/Light/Arrow - Left 2">
                                                <g id="Arrow - Left 2">
                                                    <path
                                                        id="Stroke 1"
                                                        d="M6.04427 19.1178L14.5026 10.6595L22.9609 19.1178"
                                                        stroke="#6A6A6A"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </button>
                                    <button className="rounded-full p-1 transition-all duration-300 hover:bg-slate-100 active:bg-slate-200">
                                        <svg
                                            width="29"
                                            height="30"
                                            viewBox="0 0 29 30"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g id="Iconly/Light/Arrow - Left 3">
                                                <g id="Arrow - Left 2">
                                                    <path
                                                        id="Stroke 1"
                                                        d="M22.9557 10.6595L14.4974 19.1179L6.03906 10.6595"
                                                        stroke="#6A6A6A"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <h3 className="font-semibold text-lg">Subject title</h3>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Deserunt illum qui ad vitae ducimus, molestiae quia temporibus
                                    ullam molestias. Modi, dolor fugit. Facere tempora praesentium
                                    dignissimos veritatis, suscipit repudiandae numquam?
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <div className="flex justify-end items-center gap-2 w-36">
                                            <img
                                                className="size-7 rounded-full"
                                                src="/images/student/avatar.png"
                                                alt="Avatar"
                                            />
                                            <span className="truncate">Albert Flores</span>
                                        </div>
                                        <span className="block font-medium text-dark-gray text-right w-full">
                                            2 days ago
                                        </span>
                                    </div>

                                    <div className="flex gap-2 justify-end items-center text-dark-gray">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-6">
                                            <path
                                                fillRule="evenodd"
                                                d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="font-medium">2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
