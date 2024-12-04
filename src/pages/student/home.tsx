import LineChart from '@/components/charts/line';
import { IRootState } from '@/redux';
import announcementServices from '@/redux/services/announcement.service';
import { useSelector } from 'react-redux';

function Home() {
    const {user} = useSelector((state: IRootState) => state.user);
    /* sample */
    const bestContributors = [
        {
            name: 'Jill Volage',
            avatar: '/images/student/avatar.png',
            medal: '/images/student/gmedal.png'
        },
        {
            name: 'Jhon Volage',
            avatar: '/images/student/avatar.png',
            medal: '/images/student/smedal.png'
        },
        {
            name: 'Jane Break',
            avatar: '/images/student/avatar.png',
            medal: '/images/student/bmedal.png'
        }
    ];

    const announcements = announcementServices.useGetQuery(
        {
            id: user.instituteId
        },
        {
            skip: !user.instituteId
        }
    );

    return (
        <div className="flex flex-col w-full bg-gray-100">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
            </div>

            <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-1">
                <section className="w-full col-span-3 p-4 bg-white rounded-lg h-fit">
                    <h1 className="pl-4 text-3xl font-semibold text-dark-green mb-7">
                        Announcements
                    </h1>

                    <div className="flex flex-col gap-3">
                        {announcements.data?.data.map((announcement: { title: string; announcement: string }) => (
                            <div
                                className="flex gap-3 p-4 border-2 border-gray-100 rounded-lg"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col justify-start">
                                        <h1 className="text-lg font-semibold text-black">
                                            {announcement.title}
                                        </h1>
                                    </div>
                                    <p className="text-base text-neutral-500">
                                        {announcement.announcement}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3 hidden">
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

                {/* <section className="w-full p-2 bg-white rounded-s-lg h-fit">
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
                        <div className="p-4">
                            <LineChart />
                        </div>
                    </div>
                </section> */}
            </div>
        </div>
    );
}

export default Home;
