import React from 'react';

export default function Announcement() {
    return (
        <div className="p-4 border-2 border-gray-100 rounded-[10px]">
                <div className="w-[563px] h-[63px] pr-[5px] py-1.0 justify-start items-center gap-[13px] inline-flex">
                    <img
                        src="/images/User.svg"
                        alt="User"
                        className="w-[43px] h-[43px] rounded-full"
                    />
                    <div className="w-[500px] h-[51px] flex-col justify-start inline-flex mb-4">
                        <div className="text-lg font-semibold text-black">Main Topic</div>
                        <div className="text-base font-medium text-neutral-500 ">Issued By</div>
                    </div>   
                </div>
                <div className='pl-14'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium aliquam
                    dolore velit! Quae laborum a numquam? Dolor esse sint deleniti quisquam culpa
                    voluptatem? Obcaecati ea iste quia blanditiis porro velit?
                </div>
 
        </div>
    );
}


