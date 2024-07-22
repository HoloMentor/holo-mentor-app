import Heading from '@/components/headings/main';
import Table from '@/components/table';

export default function Profile() {
    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-col gap-1">
                <span className="text-dark-green font-semibold text-left ml-20">
                    {data.class.name}
                </span>
                <span className="text-left ml-20">{data.class.institute}</span>
            </div>
        );
    };

    const renderTeacher = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-col gap-1">
                <span className="text-dark-green font-semibold">{data.teacher}</span>
            </div>
        );
    };

    const tableData = [
        {
            class: {
                name: 'Biology',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'Senaka Batagoda'
        },
        {
            class: {
                name: 'Biology',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'Senaka Batagoda'
        },
        {
            class: {
                name: 'Biology',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'Senaka Batagoda'
        },
        {
            class: {
                name: 'Biology',
                institute: 'Theory - 2023'
            },
            students: '210',
            teacher: 'Senaka Batagoda'
        }
    ];

    const tableColumns: TableColumn[] = [
        { name: 'Teacher', value: { render: renderTeacher } },
        { name: 'Class', value: { render: renderClass } },
        { name: 'Students', value: 'students' }
    ];

    return (
        <div className="flex flex-col gap-3">
            <Heading>Profile</Heading>
            <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1 max-lg:gap-0">
                <section className="w-full h-fit col-span-1">
                    <div className="bg-white px-4 py-6 mb-4 rounded-lg relative">
                        <div className="absolute right-4 top-4 cursor-pointer z-[+1]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        </div>

                        <div className="">
                            <img
                                src="/images/institute.png"
                                alt="Avatar"
                                className="rounded-full w-24 h-24 mb-4"
                            />
                            <h1 className="text-2xl font-semibold">Sasip Institute</h1>
                            <span className="text-sm text-neutral-500">Educational Institute</span>
                        </div>
                    </div>
                    <div className="bg-white px-4 py-4 mb-4 rounded-lg relative">
                        <div className="absolute right-4 top-4 cursor-pointer z-[+1]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="size-5">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                            </svg>
                        </div>

                        <h1 className="text-xl font-semibold text-dark-green">
                            Personal Information
                        </h1>

                        <ul className="mt-4">
                            <li className="flex gap-4 mb-1 text-sm items-center">
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
                            <li className="flex gap-4 mb-1 text-sm items-center">
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
                            <li className="flex gap-4 mb-1 text-sm items-center">
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
                </section>

                <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <h1 className="text-xl font-semibold text-dark-green mb-4">Students</h1>
                        <Table data={tableData} columns={tableColumns} />
                    </div>
                </section>
            </div>
        </div>
    );
}
