import Button from '@/components/button';
import ProfileInfoCard from '@/components/cards/profile';
import ProfileDetailsCard from '@/components/cards/profile-details';
import Heading from '@/components/headings/main';
import Table from '@/components/table';
import { modelNames } from '@/models';
import { modelActions } from '@/redux/reducers/model.reducer';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function teacherProfile() {
    const dispatch = useDispatch();

    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <Link to={`/class/${data.id}/progress`}>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-dark-green">{data.class.name}</span>
                    <span>{data.class.type}</span>
                </div>
            </Link>
        );
    };

    const renderEdit = () => {
        return (
            <div className="flex flex-col gap-1 ml-20">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6">
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
            </div>
        );
    };

    const tableData = [
        {
            id: 1,
            class: {
                name: 'Biology',
                type: 'Theory type - 2023'
            },
            students: '210'
        },
        {
            id: 2,
            class: {
                name: 'Maths',
                type: 'Theory - 2023'
            },
            students: '200'
        },
        {
            id: 3,
            class: {
                name: 'Physics',
                type: 'Theory type - 2023'
            },
            students: '430'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Class', value: { render: renderClass } },
        { name: 'Students', value: 'students' },
        { name: '', value: { render: renderEdit } }
    ];

    const items = [
        { key: '1', name: 'William Harpy' },
        { key: '2', name: 'Tony Reichert' },
        { key: '3', name: 'Zoey Lang' },
        { key: '4', name: 'Jane Fisher' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Profile</Heading>

            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-0">
                <section className="w-full col-span-1 h-fit">
                    <ProfileInfoCard />
                    <ProfileDetailsCard />
                    <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">
                        <h1 className="text-xl font-semibold text-dark-green">Supporting Staff</h1>

                        <ul className="mt-4">
                            {items.map((item) => (
                                <li
                                    key={item.key}
                                    className="flex items-center justify-between gap-5 mb-1 text-sm">
                                    <div className="flex flex-row items-center justify-center gap-4">
                                        <img
                                            src="/images/student/avatar-hd.jpg"
                                            alt="Avatar"
                                            className="w-10 h-10 mb-2 rounded-full"
                                        />
                                        <div className="font-semibold text-md">{item.name}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <div className="flex items-center justify-between gap-5 mb-4">
                            <h1 className="mb-1 text-xl font-semibold text-dark-green">Classes</h1>

                            <Button
                                onClick={() =>
                                    dispatch(
                                        modelActions.show({
                                            name: modelNames.ADD_CLASS
                                        })
                                    )
                                }
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
                                Add New Class
                            </Button>
                        </div>
                        <Table data={tableData} columns={tableColumns} />
                    </div>
                </section>
            </div>
        </div>
    );
}
