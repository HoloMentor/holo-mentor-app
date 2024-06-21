import React from 'react';
import Linegraph from '../components/linegraph';
import Announcement from '../components/announcment';


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
                    <div className="w-full col-span-3  bg-white  rounded-[10px] p-4 flex-col">
                        <h1 className="relative items-center pl-4 text-3xl font-semibold text-teal-900 mb-7">
                            Announcements
                        </h1>
                        <div className="grid grid-cols-1 gap-3">
                            <Announcement />
                            <Announcement />
                        </div>
                    </div>
                    <div className='col-span-2 w-full bg-white rounded-[10px] p-2'>
                        <div className='flex p-4 pl-8 '>
                            <div>
                                <h1 className="relative items-center mt-4 text-lg font-normal leading-tight text-zinc-400">
                                    Statistics
                                </h1>
                                <h1 className='text-teal-900 text-[22px] font-bold leading-7'> Student Performance</h1>
                            </div>
                            <div className='pt-2'>
                                <h1>Date</h1>
                            </div>
                        </div>
                        <div>
                            <Linegraph />
                        </div>
                    </div>
                    
                </div>
            </section>
        </div>
    );
}

export default Home;
