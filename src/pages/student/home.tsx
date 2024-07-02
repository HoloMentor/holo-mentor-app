import LineChart from '@/components/charts/line';

function Home() {
    /* sample */
    const bestContributors = [
        {
            name: 'Saliya Bandara',
            avatar: '/images/student/avatar.png',
            medal: '/images/student/gmedal.png'
        },
        {
            name: 'Saliya Bandara',
            avatar: '/images/student/avatar.png',
            medal: '/images/student/smedal.png'
        },
        {
            name: 'Saliya Bandara',
            avatar: '/images/student/avatar.png',
            medal: '/images/student/bmedal.png'
        }
    ];

    return (
        <div className="flex flex-col w-full bg-gray-100">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 max-xl:grid-cols-1">
                <section className="w-full bg-white rounded-[10px] p-4 h-fit">
                    <h1 className="pl-4 text-3xl font-semibold text-dark-green mb-7">
                        Announcements
                    </h1>

                    <div className="flex flex-col gap-3">
                        {Array.from({ length: 5 }).map((_, i) => {
                            return (
                                <div
                                    key={`announcement-${i}`}
                                    className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg">
                                    <img
                                        src="/images/User.svg"
                                        alt="User"
                                        className="rounded-full size-11"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col justify-start">
                                            <h1 className="text-lg font-semibold text-black">
                                                Main Topic
                                            </h1>
                                            <p className="text-base font-medium text-neutral-500 ">
                                                Issued By
                                            </p>
                                        </div>
                                        <p className="">
                                            Lorem ipsum dolor, sit amet consectetur adipisicing
                                            elit. Praesentium aliquam dolore velit! Quae laborum a
                                            numquam? Dolor esse sint deleniti quisquam culpa
                                            voluptatem? Obcaecati ea iste quia blanditiis porro
                                            velit?
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="w-full p-2 bg-white rounded-s-lg h-fit">
                    <div className="flex flex-col gap-8 mt-5">
                        <h1 className="text-3xl font-bold leading-7 text-dark-green">
                            Top Performance
                        </h1>
                        <div className="flex flex-col gap-4 p-4 border rounded-md border-light-border">
                            <h1 className="justify-center mb-2 ml-2 text-2xl font-semibold text-dark-green">
                                Best Contributor
                            </h1>
                            <div className="flex flex-col gap-5">
                                {bestContributors.map((_, i) => {
                                    return (
                                        <li
                                            key={`contributor-${i}`}
                                            className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <p className="font-semibold">{i + 1}</p>
                                                <img
                                                    className="border-2 rounded-full size-11"
                                                    src={_.avatar}
                                                    alt="Avatar"
                                                />
                                                <p className="text-xl font-semibold text-black">
                                                    {_.name}
                                                </p>
                                            </div>
                                            <img src={_.medal} alt="Medal" />
                                        </li>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 p-4">
                        <div>
                            <p className="relative items-center mt-4 text-base font-normal leading-tight text-zinc-400">
                                Statistics
                            </p>
                            <h1 className="text-2xl font-bold leading-7 text-dark-green">
                                Student Performance
                            </h1>
                        </div>
                        <div className="pt-2"></div>
                    </div>
                    <div className="p-4">
                        <LineChart />
                    </div>
                    <div>
                        <div className="mt-5 border-2 rounded-md">
                            <h1 className="mt-4 mt-5 ml-2 ml-5 text-3xl font-bold leading-7 text-teal-900">
                                {' '}
                                Top Performance
                            </h1>
                            <div className="mt-8 mb-4">
                                <h1 className="justify-center ml-2 text-center text-teal-900 text-[28px] font-semibold mb-2">
                                    Best Improvements
                                </h1>
                                <ul className="items-center justify-center p-2 mx-8 ml-2 list-inside ">
                                    <li className="pb-2 ">
                                        <div className="flex items-center mb-4 space-x-4 max-md:mb-2">
                                            <p>1.</p>
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-[45px] h-[45px] rounded-[100px] border-2"
                                                    src="/images/avatar.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-2xl font-semibold text-black max-md:text-xl">
                                                    Saliya bandara
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center place-self-center">
                                                <img src="/images/gmedal.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-4 space-x-4">
                                            <p>2.</p>
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-[45px] h-[45px] rounded-[100px] border-2"
                                                    src="/images/avatar.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-2xl font-semibold text-black max-md:text-xl">
                                                    Saliya bandara
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center place-self-center">
                                                <img src="/images/smedal.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-4 space-x-4">
                                            <p>3.</p>
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-[45px] h-[45px] rounded-[100px] border-2"
                                                    src="/images/avatar.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-2xl font-semibold text-black max-md:text-xl">
                                                    Saliya bandara
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center place-self-center">
                                                <img src="/images/bmedal.png" alt="" />
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-4 space-x-4">
                                            <p>4.</p>
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-[45px] h-[45px] rounded-[100px] border-2"
                                                    src="/images/avatar.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-2xl font-semibold text-black max-md:text-xl">
                                                    Saliya bandara
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center place-self-center"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
