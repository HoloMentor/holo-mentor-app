import Heading from '@/components/headings/main';
import Table from '@/components/table';
import Select, { SelectValue } from '@/components/select';
import Input from '@/components/input';
import Button from '@/components/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
import { useDispatch } from 'react-redux';

function Teachers() {
    const dispatch = useDispatch();
    const [filterValue, setFilterValue] = useState<SelectValue>('all');

    const renderTeacher = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-raw">
                <img
                    src={data.teacher.pnglink}
                    alt="avatar"
                    className="relative inline-block h-8 w-8 !rounded-full  object-cover object-center border-2 border-dark-green"
                />
                <Link to={`/teachers/${data.id}`}>
                    <span className="text-left ml-5 mt-2">{data.teacher.name}</span>
                </Link>
            </div>
        );
    };

    const tableData = [
        {
            id: 1,
            classes: '10',
            subject: 'Chemistry',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Donall Samart'
            },
            type: 'A/L'
        },
        {
            id: 2,
            classes: '10',
            subject: 'Physics',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Reuven Presdie'
            },
            type: 'A/L'
        },
        {
            id: 3,
            classes: '10',
            subject: 'Maths',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Irwin Havvock'
            },
            type: 'O/L'
        },
        {
            id: 4,
            classes: '10',
            subject: 'Science',
            teacher: {
                pnglink: 'https://picsum.photos/400',
                name: 'Bear Kestin'
            },
            type: 'O/L'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: { render: renderTeacher } },
        { name: 'No of Classes', value: 'classes' },
        { name: 'Subject', value: 'subject' },
        { name: 'Type', value: 'type' }
    ];

    const filterOptions = [
        {
            value: 'all',
            label: 'All'
        }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Teachers</Heading>
            <section className="w-full col-span-2 max-lg:pr-4">
                <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <div className="flex flex-row gap-3">
                            <Select
                                className="max-w-36"
                                options={filterOptions}
                                value={filterValue}
                                onChange={setFilterValue}
                            />
                            <Input className="max-w-96 w-full" placeholder="Search" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Input className="max-w-96 w-full" placeholder="Search" />
                            <Button
                                onClick={() =>
                                    dispatch(
                                        modelActions.show({
                                            name: modelNames.ADD_TEACHER
                                        })
                                    )
                                }
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
                        </div>
                    </div>
                    <Table data={tableData} columns={tableColumns} />
                </div>
            </section>
        </div>
    );
}

export default Teachers;
