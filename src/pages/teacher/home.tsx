import React from 'react';

const cards: JSX.Element[] = [];

for (let i = 0; i < 4; i++) {
    cards.push(
        <div
            key={`card-${i}`}
            className="flex-auto p-4 m-2 rounded-md shadow-md max-h-28 h-28 bg-light max-w-48 max-md:flex-col max-md:m-3 max-md:max-w-50 max-md:w-full">
            <div className='grid grid-flow-col grid-rows-3'>
              <img className='row-span-3 mt-2 mr-3 rounded-full place-self-start size-11'
                src='/images/card1.png'
                ></img>
              <p className='col-span-2 row-span-1 ml-3 text-3xl font-semibold place-self-start'>300</p>
              <p className='col-span-2 text-2xl font-medium place-self-start'>Students</p>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <div className="flex flex-col w-full bg-gray-100">
            <div className="flex flex-col items-center w-full">
                <img
                    src="/images/banner.png"
                    alt="Banner"
                    className="flex flex-auto w-full h-full"
                />
            </div>
            <section className='flex flex-wrap flex-grow gap-4 p-2 place-content-evenly'>
              {cards}
            </section>
            
          
        </div>
    );
}
