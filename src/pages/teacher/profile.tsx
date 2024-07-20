import Heading from '@/components/headings/main';
import Table from '@/components/table';

export default function Profile() {
    const Biology = [
        { id: 1, type: 'Theory', year: 2021 },
        { id: 2, type: 'Theory', year: 2022 },
        { id: 3, type: 'Theory', year: 2023 },
        { id: 5, type: 'Revision', year: 2024 }
    ];
    const Chemistry = [
        { id: 1, type: 'Theory', year: 2023 },
        { id: 2, type: 'Revision', year: 2024 }
    ];

    const renderClass = ({ data }: CustomTableCellData) => {
        return (
            <div className="flex flex-col gap-1">
                <span className="text-dark-green font-semibold">{data.class.name}</span>
                <span>{data.class.institute}</span>
            </div>
        );
    };

    /* this is a sample data */
    const tableData = [
        {
            class: {
                name: 'Biology',
                institute: 'Sasip Institute - 2023'
            },
            students: '210'
        }
    ];

    //handle academic staff members popup
    const tableColumns: TableColumn[] = [
        { name: 'Class', value: { render: renderClass } },
        { name: 'Students', value: 'students' }
    ];

    const items = [
        { key: '1', name: 'Saliya Bandara' },
        { key: '2', name: 'Tony Reichert' },
        { key: '3', name: 'Zoey Lang' },
        { key: '4', name: 'Jane Fisher' }
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
                                src="/images/student/avatar-hd.jpg"
                                alt="Avatar"
                                className="rounded-full w-24 h-24 mb-4"
                            />
                            <h1 className="text-2xl font-semibold">Saliya Bandara</h1>
                            <span className="text-sm text-neutral-500">Student</span>
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
                            <li className="flex gap-4 mb-4 text-sm items-center">
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
                            <li className="flex gap-4 mb-4 text-sm items-center">
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
                            <li className="flex gap-4 mb-4 text-sm items-center">
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

                        <h1 className="text-xl font-semibold text-dark-green">Academic Staff</h1>

                        <ul className="mt-4">
                            {items.map((item) => (
                                <li
                                    key={item.key}
                                    className="flex gap-5 mb-1 text-sm items-center justify-between">
                                    <div className="flex flex-row justify-center items-center gap-4">
                                        <img
                                            src="/images/student/avatar-hd.jpg"
                                            alt="Avatar"
                                            className="rounded-full w-10 h-10 mb-2"
                                        />
                                        <div className="text-md font-semibold">{item.name}</div>
                                    </div>
                                    <div className="text-lg text-neutral-500 cursor-pointer w-5 h-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="red"
                                            className="size-5">
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <section className="w-full col-span-2 max-lg:pr-4">
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <h1 className="text-xl font-semibold text-dark-green">My Classess</h1>
                        <div className="ml-4 mt-5 font-medium">Biology</div>
                        <div className="flex mt-7 mb-4 mx-6 justify-start flex-wrap">
                            {Biology.map((tution) => (
                                <div
                                    key={tution.id}
                                    className="flex w-24 mr-8 mb-10 justify-center items-center rotate-45
                             rounded-3xl aspect-square  border border-dark-green shadow-custom bg-slate-50 p-4">
                                    <div className="-rotate-45 flex flex flex-col justify-center items-center">
                                        <span className="text-lg">{tution.type} </span>
                                        <span className="text-xs">{tution.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="ml-4 mt-5 font-medium">Chemistry</div>
                        <div className="flex mt-7 mb-4 mx-6 justify-start">
                            {Chemistry.map((tution) => (
                                <div
                                    key={tution.id}
                                    className="flex w-24 mr-8 mb-10 justify-center items-center rotate-45
                             rounded-3xl aspect-square  border border-dark-green shadow-custom bg-slate-50 p-4">
                                    <div className="-rotate-45 flex flex flex-col justify-center items-center">
                                        <span className="text-lg">{tution.type} </span>
                                        <span className="text-xs">{tution.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <h1 className="text-xl font-semibold text-dark-green mb-4">
                            Educational Institute
                        </h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center text-neutral-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="56"
                                    height="57"
                                    viewBox="0 0 56 57"
                                    fill="none"
                                    strokeWidth={0.025}
                                    stroke="currentColor"
                                    className="size-12">
                                    <path
                                        d="M6.529 50.9348C5.438 50.9348 4.577 50.5848 3.946 49.8828C3.364 49.2348 3.05 48.3848 3.006 47.3328L3 47.0658V9.48182C3 8.29182 3.315 7.34882 3.946 6.65482C4.528 6.01382 5.306 5.66782 6.281 5.61882L6.53 5.61182H33.337C34.414 5.61182 35.267 5.95882 35.899 6.65382C36.481 7.29382 36.794 8.14682 36.839 9.21082L36.844 9.48082V16.0708H49.494C50.487 16.0708 51.292 16.3708 51.905 16.9678L52.055 17.1238C52.637 17.7708 52.951 18.6208 52.995 19.6728L53.001 19.9398V47.0658C53.001 48.2418 52.686 49.1808 52.055 49.8828C51.473 50.5298 50.7 50.8788 49.738 50.9288L49.493 50.9348H6.529ZM36.843 47.0658C36.843 47.2188 36.838 47.3678 36.827 47.5128H48.365C48.776 47.5128 49.081 47.4128 49.28 47.2148C49.45 47.0448 49.547 46.7908 49.571 46.4548L49.578 46.2798V20.7268C49.578 20.3018 49.478 19.9898 49.28 19.7908C49.11 19.6208 48.861 19.5238 48.535 19.4998L48.365 19.4938L36.843 19.4928V47.0658ZM32.21 9.03482H7.656C7.23 9.03482 6.919 9.13382 6.72 9.33182C6.55 9.50182 6.453 9.75582 6.429 10.0918L6.423 10.2678V46.2798C6.423 46.7048 6.522 47.0158 6.72 47.2148C6.89 47.3848 7.144 47.4818 7.48 47.5058L7.656 47.5128L12.523 47.5118V41.2418C12.523 40.4038 12.697 39.7678 13.043 39.3348L13.151 39.2108C13.531 38.8178 14.096 38.6038 14.845 38.5678L15.075 38.5628H24.769C25.647 38.5628 26.292 38.7788 26.703 39.2108C27.077 39.6038 27.281 40.1988 27.315 40.9958L27.32 41.2408L27.319 47.5118H32.209C32.62 47.5118 32.925 47.4128 33.123 47.2148C33.293 47.0448 33.391 46.7908 33.415 46.4548L33.421 46.2798V10.2678C33.421 9.84182 33.321 9.53082 33.123 9.33182C32.925 9.13382 32.621 9.03482 32.21 9.03482ZM23.855 41.3478H15.989C15.577 41.3478 15.352 41.5348 15.314 41.9098L15.309 42.0278L15.308 47.5118H24.534V42.0278C24.534 41.6158 24.347 41.3908 23.973 41.3528L23.855 41.3478ZM44.922 39.2428C45.363 39.2428 45.602 39.4448 45.639 39.8498L45.644 39.9658V43.2818C45.644 43.7238 45.442 43.9628 45.037 43.9998L44.922 44.0048H41.499C41.07 44.0048 40.839 43.8018 40.802 43.3978L40.798 43.2818V39.9658C40.798 39.5238 40.994 39.2848 41.388 39.2478L41.499 39.2428H44.922ZM44.922 31.1228C45.363 31.1228 45.602 31.3248 45.639 31.7298L45.644 31.8448V35.1608C45.644 35.6028 45.442 35.8418 45.037 35.8788L44.922 35.8838H41.499C41.07 35.8838 40.839 35.6818 40.802 35.2768L40.798 35.1608V31.8448C40.798 31.4028 40.994 31.1638 41.388 31.1268L41.499 31.1218L44.922 31.1228ZM17.009 29.3998C17.546 29.3998 17.835 29.6478 17.876 30.1428L17.881 30.2718V34.2898C17.881 34.8258 17.633 35.1148 17.138 35.1558L17.009 35.1608H12.864C12.354 35.1608 12.079 34.9138 12.04 34.4188L12.035 34.2888V30.2718C12.035 29.7358 12.27 29.4468 12.741 29.4048L12.864 29.3998H17.009ZM26.959 29.3998C27.495 29.3998 27.783 29.6478 27.825 30.1428L27.83 30.2718V34.2898C27.83 34.8258 27.582 35.1148 27.087 35.1558L26.958 35.1608H22.834C22.311 35.1608 22.029 34.9138 21.989 34.4188L21.984 34.2888V30.2718C21.984 29.7358 22.225 29.4468 22.708 29.4048L22.834 29.3998H26.959ZM44.922 23.0008C45.363 23.0008 45.602 23.2038 45.639 23.6088L45.644 23.7238V27.0408C45.644 27.4818 45.442 27.7208 45.037 27.7578L44.922 27.7628H41.499C41.07 27.7628 40.839 27.5608 40.802 27.1558L40.798 27.0408V23.7238C40.798 23.2828 40.994 23.0438 41.388 23.0058L41.499 23.0008H44.922ZM17.009 20.9808C17.546 20.9808 17.835 21.2288 17.876 21.7248L17.881 21.8528V25.8708C17.881 26.4078 17.633 26.6968 17.138 26.7378L17.009 26.7428H12.864C12.354 26.7428 12.079 26.4948 12.04 25.9998L12.035 25.8708V21.8528C12.035 21.3168 12.27 21.0278 12.741 20.9868L12.864 20.9818L17.009 20.9808ZM26.959 20.9808C27.495 20.9808 27.783 21.2288 27.825 21.7248L27.83 21.8528V25.8708C27.83 26.4078 27.582 26.6968 27.087 26.7378L26.958 26.7428H22.834C22.311 26.7428 22.029 26.4948 21.989 25.9998L21.984 25.8708V21.8528C21.984 21.3168 22.225 21.0278 22.708 20.9868L22.834 20.9818L26.959 20.9808ZM17.009 12.5638C17.546 12.5638 17.835 12.8108 17.876 13.3058L17.881 13.4358V17.4528C17.881 17.9888 17.633 18.2778 17.138 18.3188L17.009 18.3248H12.864C12.354 18.3248 12.079 18.0768 12.04 17.5818L12.035 17.4528V13.4348C12.035 12.8988 12.27 12.6098 12.741 12.5688L12.864 12.5638H17.009ZM26.959 12.5638C27.495 12.5638 27.783 12.8108 27.825 13.3058L27.83 13.4358V17.4528C27.83 17.9888 27.582 18.2778 27.087 18.3188L26.958 18.3248H22.834C22.311 18.3248 22.029 18.0768 21.989 17.5818L21.984 17.4528V13.4348C21.984 12.8988 22.225 12.6098 22.708 12.5688L22.834 12.5638H26.959Z"
                                        fill="#6A6A6A"
                                    />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium">Sasip Institue</div>
                                <div className="text-xs">Nugegoda</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white px-6 py-4 mb-4 rounded-lg relative">
                        <h1 className="text-xl font-semibold text-dark-green mb-4">Students</h1>

                        <Table data={tableData} columns={tableColumns} />
                    </div>
                </section>
            </div>
        </div>
    );
}
