import React from 'react'

const classes:JSX.Element[] = [];

for(let i = 0; i < 3;i++ ){
    classes.push(
        <div key={`${i}`} className='p-4 m-4 bg-white rounded-md shadow-md w-72 h-72'>
            <div className='flex flex-col items-center'>
            <img 
                src='/images/institute.png'
                className='self-center m-4 mt-8'
            />
            <div className='mt-10 border-t-4 '>
                <p className='flex text-2xl font-semibold'>Sasip Institute</p>
                <p className='flex text-xl'>Nugegoda</p>
            </div>
            </div>
           
        </div>
    )
}

export default function Classes() {
  return (
    <div className='grid justify-between grid-cols-3 gap-5 m-3'>
        {classes}
    </div>
  )
}
