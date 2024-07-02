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
        <div className="flex flex-col bg-gray-100 w-full">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
            </div>

            <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-1">
                <section className="w-full bg-white rounded-lg p-4 h-fit col-span-2">
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
                                        className="size-11 rounded-full"
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

                <section className="w-full bg-white rounded-s-lg p-2 h-fit">
                    <div className="mt-5 flex flex-col gap-8">
                        <h1 className="text-3xl font-bold leading-7 text-dark-green">
                            Top Performance
                        </h1>
                        <div className="flex flex-col gap-4 rounded-md border border-light-border p-4">
                            <h1 className="justify-center ml-2 text-dark-green text-2xl font-semibold mb-2">
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
                                                    className="size-11 rounded-full border-2"
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
                            <h1 className="text-dark-green text-2xl font-bold leading-7">
                                Student Performance
                            </h1>
                        </div>
                        <div className="p-4">
                            <LineChart />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;