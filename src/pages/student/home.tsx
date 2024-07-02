import React from 'react';
import LineChart from '@/components/charts/line';
import Announcement from '@/components/home/announcement';

function Home() {
    return (
        <div className="flex items-center justify-center bg-gray-100 lg:flex lg:flex-col">
            <section className="box-border flex flex-col items-center justify-center w-full">
                <div className="flex flex-col items-center w-full max-w-[1280px] max-h-[250px] mb-2">
                    <img
                        src="/images/Home.png"
                        alt="Logo"
                        className="flex flex-auto w-full h-full"
                    />
                </div>
                <div className="max-w-[1280px] grid grid-cols-5 w-full justify-items-center mb-4 gap-4 px-2 mr-3">
                    <div className="w-full col-span-3 max-md:col-span-5 bg-white  rounded-[10px] p-4 flex-col">
                        <h1 className="relative items-center pl-4 text-3xl font-semibold text-teal-900 mb-7">
                            Announcements
                        </h1>
                        <div className="grid grid-cols-1 gap-3">
                            <Announcement />
                            <Announcement />
                        </div>
                    </div>
                    <div className="col-span-2 max-md:col-span-5 w-full bg-white rounded-[10px] p-2">
                        <div className="flex p-4 pl-8 ">
                            <div>
                                <h1 className="relative items-center mt-4 text-lg font-normal leading-tight text-zinc-400">
                                    Statistics
                                </h1>
                                <h1 className="text-teal-900 text-[22px] font-bold leading-7">
                                    {' '}
                                    Student Performance
                                </h1>
                            </div>
                            <div className="pt-2">
                                <h1>Date</h1>
                            </div>
                        </div>
                        <div>
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
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
