import Announcement from '@/components/home/announcement';
import LineChart from '@/components/charts/line';

function Home() {
    return (
        <div className="flex flex-col bg-gray-100 w-full">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/home-banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 max-xl:grid-cols-1">
                <section className="w-full bg-white rounded-[10px] p-4 h-fit">
                    <h1 className="pl-4 text-3xl font-semibold text-dark-green mb-7">
                        Announcements
                    </h1>

                    <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                        <Announcement />
                        <Announcement />
                    </div>
                </section>

                <section className="w-full bg-white rounded-[10px] p-2 h-fit">
                    <div className="flex p-4 pl-8 ">
                        <div>
                            <p className="relative items-center mt-4 text-base font-normal leading-tight text-zinc-400">
                                Statistics
                            </p>
                            <h1 className="text-dark-green text-2xl font-bold leading-7">
                                Student Performance
                            </h1>
                        </div>
                        <div className="pt-2"></div>
                    </div>
                    <div className="p-4">
                        <LineChart />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
