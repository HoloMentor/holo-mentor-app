import Heading from '@/components/headings/main';
import Table from '@/components/table';
import Button from '@/components/button';
import {Link} from "react-router-dom";
import { modelActions } from '@/redux/reducers/model.reducer';
import { modelNames } from '@/models';
 
export default function teacherProfile() {
    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <Link to={`/class/${data.id}/progress`}>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-dark-green">{data.class.name}</span>
                    <span>{data.class.institute}</span>
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
            id : 1,
            class: {
                name: 'Biology',
                institute: 'Devify Institute - 2023'
            },
            students: '210'
        },
        {
            id : 2,
            class: {
                name: 'Maths',
                institute: 'Skiba Institute - 2023'
            },
            students: '200'
        },
        {
            id : 3,
            class: {
                name: 'Physics',
                institute: 'Roodel Institute - 2023'
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
                    <div className="relative px-4 py-6 mb-4 bg-white rounded-lg">
                        <div className="">
                            <img
                                src="/images/student/avatar-hd.jpg"
                                alt="Avatar"
                                className="w-24 h-24 mb-4 rounded-full"
                            />
                            <h1 className="text-2xl font-semibold">Senaka Batagoda</h1>
                            <span className="text-sm text-neutral-500">Teacher</span>
                        </div>
                    </div>
                    <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">
                        <h1 className="text-xl font-semibold text-dark-green">
                            Personal Information
                        </h1>

                        <ul className="mt-4">
                            <li className="flex items-center gap-4 mb-1 text-sm">
                                <div className="flex items-center justify-center w-5 h-5 text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                                        />
                                    </svg>
                                </div>
                                <span>
                                    <a href="mailto:saliya@gmail.com" className="text-black">
                                        saliya@gmail.com
                                    </a>
                                </span>
                            </li>
                            <li className="flex items-center gap-4 mb-1 text-sm">
                                <div className="flex items-center justify-center w-5 h-5 text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                        />
                                    </svg>
                                </div>
                                <span>
                                    <a href="tel:+94771234567" className="text-black">
                                        077 123 4567
                                    </a>
                                </span>
                            </li>
                            <li className="flex items-center gap-4 mb-1 text-sm">
                                <div className="flex items-center justify-center w-5 h-5 text-neutral-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                        />
                                    </svg>
                                </div>
                                <span>Sri Lanka</span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative px-4 py-4 mb-4 bg-white rounded-lg">

                        <h1 className="text-xl font-semibold text-dark-green">Academic Staff</h1>

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
