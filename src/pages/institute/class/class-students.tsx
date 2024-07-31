import Heading from '@/components/headings/main';
import Table from '@/components/table';
import Input from '@/components/input';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import Button from '@/components/button';

function classStudent() {
    const renderTeacher = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-raw">
                <img
                    src={data.teacher.pnglink}
                    alt="avatar"
                    className="relative inline-block h-8 w-8 !rounded-full  object-cover object-center border-2 border-dark-green"
                />
                <span className="text-left ml-5 mt-2">{data.teacher.name}</span>
            </div>
        );
    };

    const tableData = [
        {
            classes: '10',
            subject: 'Chemistry',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Marco Panting'
            },
            type: 'A/L'
        },
        {
            classes: '10',
            subject: 'Physics',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Jaquenette Trout'
            },
            type: 'A/L'
        },
        {
            classes: '10',
            subject: 'Maths',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Catriona Blissett'
            },
            type: 'O/L'
        },
        {
            classes: '10',
            subject: 'Science',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Sandy Emeny'
            },
            type: 'O/L'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: { render: renderTeacher } },
        { name: 'Subject', value: 'subject' },
        { name: 'No of Classes', value: 'classes' },
        { name: 'Type', value: 'type' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Teachers</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <Input className="max-w-36" placeholder="Search" />
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
                                    Add New Student
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    className="text-center text-black"
                                    key="new"
                                    href={`${location.pathname}/addone`}>
                                    Add One Student
                                </DropdownItem>
                                <DropdownItem
                                    className="text-center text-black"
                                    key="copy"
                                    href={`${location.pathname}/addmany`}>
                                    Add Using CSV File
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Table data={tableData} columns={tableColumns} />
                </div>
            </section>
        </div>
    );
}
export default classStudent;
